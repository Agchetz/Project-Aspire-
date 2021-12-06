"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.createUser = exports.getUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const config = require("../config/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find();
        return res
            .status(config.successStatusCode)
            .json(response("Users returned successfully", users, config.successStatusCode));
    }
    catch (error) {
        return res
            .status(config.badRequestStatusCode)
            .json(response("Unable to get  the user", {}, config.badRequestStatusCode));
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const user = new userModel_1.default({
            userName: body.userName,
            phoneNumber: body.phoneNumber,
            email: body.email,
            password: bcrypt.hashSync(body.password.toString(), 10),
        });
        let userExist;
        userExist = yield checkEmail(body.email);
        if (userExist) {
            return res
                .status(config.badRequestStatusCode)
                .json(response("User already exist", body, config.badRequestStatusCode));
        }
        const newUser = yield user.save();
        return res
            .status(config.successStatusCode)
            .json(response("User added", newUser, config.successStatusCode));
    }
    catch (error) {
        return res
            .status(config.badRequestStatusCode)
            .json(response("Unable to create the user", {}, config.badRequestStatusCode));
    }
});
exports.createUser = createUser;
const checkEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.findOne({ email: email });
        return users;
    }
    catch (error) {
        return null;
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.findOne({ email: req.body.email });
        if (!users) {
            return res
                .status(config.badRequestStatusCode)
                .json(response("user not exist", req.body, config.successStatusCode));
        }
        if (!(yield bcrypt.compare(req.body.password, users.password))) {
            return res
                .status(config.badRequestStatusCode)
                .json(response("Invalid password", req.body, config.badRequestStatusCode));
        }
        return res
            .status(config.successStatusCode)
            .json(response("Users returned successfully", [createToken(users), users.userName], config.successStatusCode));
    }
    catch (error) {
        return res
            .status(config.badRequestStatusCode)
            .json(response("Unable to login", {}, config.badRequestStatusCode));
    }
});
exports.login = login;
let response = (message, data, status) => {
    return { message, data, status };
};
const createToken = (user) => {
    const expiresIn = 60 * 60;
    const secret = "123456789";
    return {
        expiresIn,
        token: jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn }),
    };
};

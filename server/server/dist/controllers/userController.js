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
        return res.status(config.successStatusCode).json({
            status: 200,
            message: "Users returned successfully",
            data: users
        });
    }
    catch (error) {
        return res.status(config.badRequestStatusCode).json({
            message: 'Unable to get  the user',
            data: {},
            status: config.badRequestStatusCode
        });
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
            return res.status(config.badRequestStatusCode).json({
                message: 'User already exist',
                data: body,
                status: config.badRequestStatusCode
            });
        }
        const newUser = yield user.save();
        return res.status(config.successStatusCode).json({ message: 'User added', data: newUser, status: 200 });
    }
    catch (error) {
        return res.status(config.badRequestStatusCode).json({
            message: 'Unable to create the user',
            data: {},
            status: config.badRequestStatusCode
        });
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
            return res.status(config.badRequestStatusCode).json({ status: 200, message: "user not exist", data: req.body });
        }
        if (!(yield bcrypt.compare(req.body.password, users.password))) {
            return res.status(config.badRequestStatusCode).json({
                status: 400,
                message: "Invalid password",
                data: req.body
            });
        }
        return res.status(config.successStatusCode).json({
            status: 200,
            message: "Users returned successfully",
            data: [createToken(users), users.userName]
        });
    }
    catch (error) {
        return res.status(config.badRequestStatusCode).json({
            message: 'Unable to login',
            data: {},
            status: config.badRequestStatusCode
        });
    }
});
exports.login = login;
const createToken = (user) => {
    const expiresIn = 60 * 60;
    const secret = "123456789";
    return {
        expiresIn,
        token: jwt.sign({ "id": user._id, email: user.email }, secret, { expiresIn }),
    };
};

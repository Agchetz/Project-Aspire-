"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const config = require("../config/config");
const checkJwt = (req, res, next) => {
    //Get the jwt token from the head
    let token = req.headers["authorization"];
    console.log("token -" + token);
    let jwtPayload;
    token = token.split(" ");
    token = token[1];
    //Try to validate the token and get data
    try {
        jwtPayload = jwt.verify(token, config.jwtSecret, (err, payload) => {
            if (err) {
                res.status(config.unAuthStatusCode).json({ message: 'please  login', data: {}, status: 401 });
            }
            else {
                req.body['user_id'] = payload.id;
            }
        });
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error) {
        res.status(config.unAuthStatusCode).json({ message: 'please login', data: {}, status: 401 });
        return;
    }
    next();
};
exports.checkJwt = checkJwt;

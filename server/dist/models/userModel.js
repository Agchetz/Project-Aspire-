"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
<<<<<<< HEAD:server/dist/models/userModel.js
    token: {
        type: String,
    }
=======
>>>>>>> 3ef7251bc909695ba407ff9c0281f4f26072d7a5:server/server/dist/models/userModel.js
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("IUser", userSchema);

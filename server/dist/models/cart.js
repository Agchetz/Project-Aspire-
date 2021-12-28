"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cartSchema = new mongoose_1.Schema([{
        image: {
            type: String,
        },
        product: {
            type: String,
            required: true,
        },
        department: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        user_id: {
            type: String,
            required: true,
        },
    },], { timestamps: true });
exports.default = (0, mongoose_1.model)("Cart", cartSchema);

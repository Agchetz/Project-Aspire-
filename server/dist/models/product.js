"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true,
    },
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
        trype: Number,
    },
    price: {
        type: Number,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Product", productSchema);

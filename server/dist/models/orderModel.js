"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
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
    stock: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["ordered", "packed", "dispatched", "delivered"],
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Order", orderSchema);

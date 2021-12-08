"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// enum status = {ordered, packed, dispatched, delivered}
const orderSchema = new mongoose_1.Schema({
    user_id: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['ordered', 'packed', 'dispatched', 'delivered'],
        required: true
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Order', orderSchema);

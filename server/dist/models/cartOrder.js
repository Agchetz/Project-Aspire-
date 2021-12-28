"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const product_1 = require("./product");
const cartOrderSchema = new mongoose_1.Schema({
    orderdetails: {
        type: [product_1.productSchema],
        required: true
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("orderCart", cartOrderSchema);

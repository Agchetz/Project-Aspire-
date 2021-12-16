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
exports.deleteProduct = exports.getCartProducts = exports.updateCart = exports.addToCart = exports.getProduct = void 0;
const product_1 = __importDefault(require("../models/product"));
const orderModel_1 = __importDefault(require("../models/orderModel"));
const config = require("../config/config");
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    orderModel_1.default.find({}, (err, data) => {
        if (err) {
            res.status(500).json({ message: "internal server problem" });
        }
        else {
            res.status(200).json(data);
        }
    });
});
exports.getProduct = getProduct;
const addToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = res.locals.jwtPayload;
    try {
        const product = new product_1.default(req.body);
        const cartProduct = yield product.save();
        res
            .status(200)
            .json(response("Product added to cart", cartProduct, config.successStatusCode));
    }
    catch (error) {
        console.error(error);
        res
            .status(config.badRequestStatusCode)
            .json(response("Unable to add  the product to cart", { error }, config.badRequestStatusCode));
    }
});
exports.addToCart = addToCart;
const updateCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = yield product_1.default.findOneAndUpdate({ user_id: req.body.user_id, product: req.body.product }, req.body);
        res
            .status(config.successStatusCode)
            .json(response("Cart updated", newProduct, config.successStatusCode));
    }
    catch (error) {
        console.error(error);
        res
            .status(config.badRequestStatusCode)
            .json(response("Unable to update  the cart", {}, config.badRequestStatusCode));
    }
});
exports.updateCart = updateCart;
const getCartProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    product_1.default.find({ user_id: req.body.user_id }, (err, data) => {
        if (err) {
            res.status(500).json({ message: "internal server problem" });
        }
        else {
            res.status(200).json(data);
        }
    });
});
exports.getCartProducts = getCartProducts;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteProduct = yield product_1.default.deleteOne({ user_id: req.body.user_id, product: req.body.product });
        res
            .status(config.successStatusCode)
            .json(response("Product is removed from the cart", deleteProduct, config.successStatusCode));
    }
    catch (error) {
        console.error(error);
        res
            .status(config.badRequestStatusCode)
            .json(response("Unable to remove the peoduct from the cart", {}, config.badRequestStatusCode));
    }
});
exports.deleteProduct = deleteProduct;
let response = (message, data, status) => {
    return { message, data, status };
};

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
exports.clearCart = exports.getcartOrders = exports.checkout = exports.deleteProduct = exports.getCartProducts = exports.updateCart = exports.addToCart = exports.getProduct = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const cart_1 = __importDefault(require("../models/cart"));
const cartOrder_1 = __importDefault(require("../models/cartOrder"));
const config = require("../config/config");
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    productModel_1.default.find({}, (err, data) => {
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
    try {
        let isExistingCart = yield cart_1.default.find({ user_id: req.body.user_id });
        if (isExistingCart.length) {
            let temp = isExistingCart[0].product;
            let isAlreadyExistedProduct = false;
            let existingProducts = temp.map((element) => {
                if (element.product.equals(req.body.id)) {
                    isAlreadyExistedProduct = true;
                    element.quantity++;
                }
                return element;
            });
            let updatedProducts = [...existingProducts];
            if (isAlreadyExistedProduct === false) {
                updatedProducts.push({ product: req.body.id, quantity: 1 });
            }
            console.log(updatedProducts, "*******************");
            yield cart_1.default.findOneAndUpdate({ _id: isExistingCart[0]._id }, { product: updatedProducts });
        }
        else {
            const product = new cart_1.default({
                user_id: req.body.user_id,
                product: [{ product: req.body.id, quantity: 1 }],
            });
            console.log(product, "*******************");
            const cartProduct = yield product.save();
            res
                .status(200)
                .json(response("Product added to cart", cartProduct, config.successStatusCode));
        }
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
        let demo = 0;
        let existedProduct = yield cart_1.default.find({ user_id: req.body.user_id });
        let temp = existedProduct[0].product;
        demo = temp.map((element) => {
            if (element._id.equals(req.body[0]._id)) {
                element.quantity = req.body[0].quantity;
            }
            return element;
        });
        console.log("**********", demo);
        let updated = yield cart_1.default.findOneAndUpdate({ user_id: req.body.user_id }, { product: demo });
        res
            .status(config.successStatusCode)
            .json(response("Cart updated", updated, config.successStatusCode));
    }
    catch (error) {
        console.error(error);
        res
            .status(config.badRequestStatusCode)
            .json(response("Unable to update  the cart", {}, config.badRequestStatusCode));
    }
});
exports.updateCart = updateCart;
//todo
const getCartProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body.user_id);
        const getProduct = yield cart_1.default.find({
            user_id: req.body.user_id,
        });
        let check = [];
        let temp = getProduct[0].product;
        let demo = yield temp.map((data, index) => __awaiter(void 0, void 0, void 0, function* () {
            let test = yield productModel_1.default.find({ _id: data.product });
            let testing = yield test.map((element) => {
                return {
                    _id: data._id,
                    id: element._id,
                    product: element.product,
                    quantity: data.quantity,
                    price: element.price,
                    image: element.image,
                };
            });
            yield check.push(testing);
            return check;
        }));
        setTimeout(() => {
            res
                .status(config.successStatusCode)
                .json(response("Cart updated", check, config.successStatusCode));
        }, 500);
    }
    catch (error) {
        console.error(error);
        res
            .status(config.badRequestStatusCode)
            .json(response("Unable to update the cart", {}, config.badRequestStatusCode));
    }
});
exports.getCartProducts = getCartProducts;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        let temp = { _id: req.body._id };
        const deleteProduct = yield cart_1.default.deleteOne({ product: temp });
        console.log(deleteProduct);
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
const checkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let body = req.body.body;
        let temp = [];
        let id = [];
        let temp_quantity = [];
        let check = yield body.orderdetails.map((element) => {
            id = element.id;
            temp_quantity = element.quantity;
            temp.push({ id: element.id, quantity: element.quantity });
            return { id, temp_quantity };
        });
        console.log(temp);
        let orderproduct = new cartOrder_1.default({
            orderdetails: temp,
            user_id: req.body.user_id,
            total: req.body.total,
        });
        const cartProduct = yield orderproduct.save();
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
exports.checkout = checkout;
const clearCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body.user_id);
        const deleteCart = yield cart_1.default.deleteMany({
            user_id: req.body.user_id,
        });
        res
            .status(config.successStatusCode)
            .json(response("Product is removed from the cart", deleteCart, config.successStatusCode));
    }
    catch (error) {
        console.error(error);
        res
            .status(config.badRequestStatusCode)
            .json(response("Unable to remove the product from the cart", {}, config.badRequestStatusCode));
    }
});
exports.clearCart = clearCart;
const getcartOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cart = yield cartOrder_1.default
            .aggregate()
            .match({ user_id: req.body.user_id })
            .unwind("$orderdetails")
            .lookup({
            from: "products",
            localField: "orderdetails.id",
            foreignField: "_id",
            as: "productDetails",
        })
            .group({
            _id: "$_id",
            orderdetails: { $push: "$orderdetails" },
            user_id: { $first: "$user_id" },
            total: { $first: "$total" },
            productdetails: { $push: "$productDetails" },
        })
            .project({
            product: {
                $reduce: {
                    input: "$productdetails",
                    initialValue: [],
                    in: { $concatArrays: ["$$value", "$$this"] },
                },
            },
            orderdetails: 1,
            total: 1,
        });
        cart.map((data) => {
            let orderDetails = data.orderdetails;
            let productDetails = data.product;
            for (let i in orderDetails) {
                productDetails[i].quantity = orderDetails[i].quantity;
            }
            return {
                product: data.product,
                total: data.total,
            };
        });
        res
            .status(config.successStatusCode)
            .json(response("Cart updated", cart, config.successStatusCode));
    }
    catch (error) {
        console.error(error);
        res
            .status(config.badRequestStatusCode)
            .json(response("Unable to update the cart", {}, config.badRequestStatusCode));
    }
});
exports.getcartOrders = getcartOrders;
let response = (message, data, status) => {
    return { message, data, status };
};

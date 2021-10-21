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
exports.getOrderStatus = exports.orderId = exports.deleteOrder = exports.updateOrder = exports.createOrder = exports.getOrder = void 0;
const orderModel_1 = __importDefault(require("../models/orderModel"));
const orderModel_2 = __importDefault(require("../models/orderModel"));
const config = require("../config/config");
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.user_id;
    orderModel_2.default.find({ "user_id": id }, (err, data) => {
        if (err) {
            res.status(500).json({ message: "internal server problem" });
        }
        else {
            res.json(data);
        }
    });
});
exports.getOrder = getOrder;
const getOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let statusData = yield orderModel_2.default.aggregate()
        .group({ _id: "$status", total: { $sum: 1 } })
        .project({ _id: 1, total: 1 });
    res.send(statusData);
});
exports.getOrderStatus = getOrderStatus;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = res.locals.jwtPayload;
    try {
        const order = new orderModel_1.default(req.body);
        const newOrder = yield order.save();
        res.status(201).json({ message: 'Order added', data: newOrder, status: config.successStatusCode });
    }
    catch (error) {
        console.error(error);
        res.status(config.badRequestStatusCode).json({ status: config.badRequestStatusCode, message: "Unable to add  the order", data: {} });
    }
});
exports.createOrder = createOrder;
const updateOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        const newOrder = yield orderModel_2.default.findOneAndUpdate({ _id: req.body.id }, req.body);
        res.status(config.successStatusCode).json({ message: 'Order updated', data: newOrder, status: config.successStatusCode });
    }
    catch (error) {
        console.error(error);
        res.status(config.badRequestStatusCode).json({ status: config.badRequestStatusCode, message: "Unable to update  the order", data: {} });
    }
});
exports.updateOrder = updateOrder;
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteOrder = yield orderModel_2.default.deleteOne({ _id: req.body.id });
        res.status(config.successStatusCode).json({ message: 'Order deleted', data: deleteOrder, status: config.successStatusCode });
    }
    catch (error) {
        console.error(error);
        res.status(config.badRequestStatusCode).json({ status: config.badRequestStatusCode, message: "Unable to delete  the order", data: {} });
    }
});
exports.deleteOrder = deleteOrder;
const orderId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    orderModel_2.default.find({ _id: id }, (err, data) => {
        res.send(data);
    });
});
exports.orderId = orderId;
function getStatus() {
}

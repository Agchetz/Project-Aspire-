import { Response, Request } from "express";
import { IOrder, orderTestStatus } from "../types/order";
import Order from "../models/orderModel";
import orderModel from "../models/orderModel";
const config = require("../config/config");

const getOrder = async (req: Request, res: Response): Promise<void> => {
  const id = req.body.user_id;
  orderModel.find({ user_id: id }, (err: Response, data: Response) => {
    if (err) {
      res.status(500).json({ message: "internal server problem" });
    } else {
      res.json(data);
    }
  });
};

const getOrderStatus = async (req: Request, res: Response): Promise<void> => {
  let statusData: orderTestStatus[] = await orderModel
    .aggregate()
    .match({user_id: req.body.user_id})
    .group({ _id: "$status", total: { $sum: 1 } })
    .project({ _id: 1, total: 1 });
  res.send(statusData);
};

const createOrder = async (req: Request, res: Response): Promise<void> => {
  let user = res.locals.jwtPayload;
  try {
    const order: IOrder = new Order(req.body);
    console.log(req.body)
    const newOrder: IOrder = await order.save();
    res
      .status(201)
      .json(response("order added", newOrder, config.successStatusCode));
  } catch (error) {
    console.error(error);
    res
      .status(config.badRequestStatusCode)
      .json(
        response("Unable to add  the order", {}, config.badRequestStatusCode)
      );
  }
};

const updateOrder = async (req: any, res: Response): Promise<void> => {
  try {
    const newOrder: any = await orderModel.findOneAndUpdate(
      { _id: req.body.id },
      req.body
    );
    res
      .status(config.successStatusCode)
      .json(response("Order updated", newOrder, config.successStatusCode));
  } catch (error) {
    console.error(error);
    res
      .status(config.badRequestStatusCode)
      .json(
        response("Unable to update  the order", {}, config.badRequestStatusCode)
      );
  }
};

const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleteOrder: any = await orderModel.deleteOne({ _id: req.body.id });
    res
      .status(config.successStatusCode)
      .json(response("Order deleted", deleteOrder, config.successStatusCode));
  } catch (error) {
    console.error(error);
    res
      .status(config.badRequestStatusCode)
      .json(
        response("Unable to delete  the order", {}, config.badRequestStatusCode)
      );
  }
};

let response = (message: string, data: any, status: number) => {
  return { message, data, status };
};

const orderId = async (req: Request, res: Response) => {
  const id = req.params.id;
  orderModel.find({ _id: id }, (err: Response, data: Response) => {
    res.send(data);
  });
};

export {
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  orderId,
  getOrderStatus,
};

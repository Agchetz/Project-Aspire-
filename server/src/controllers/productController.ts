import { Response, Request } from "express";
import { Iproduct } from "../types/product";
import Product from "../models/product";
import orderModel from "../models/orderModel";
import { productValidator } from "../validations/validator";
const config = require("../config/config");

const getProduct = async (req: Request, res: Response): Promise<void> => { 
    orderModel.find({}, (err: Response, data: Response) => {
      if (err) {
        res.status(500).json({ message: "internal server problem" });
      } else {
        res.status(200).json( data );
      }
    })
}

const addToCart = async (req: Request, res: Response): Promise<void> => {
  let user = res.locals.jwtPayload;
  try {
    const product: Iproduct = new Product(req.body);
    const cartProduct: Iproduct = await product.save();
    res
      .status(200)
      .json(response("Product added to cart", cartProduct, config.successStatusCode));
  } catch (error) {
    console.error(error);
    res
      .status(config.badRequestStatusCode)
      .json(
        response("Unable to add  the product to cart", {error}, config.badRequestStatusCode)
      );
  }
};

const updateCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const newProduct: any = await Product.findOneAndUpdate(
      { user_id: req.body.user_id, product: req.body.product  },
      req.body
    );
    res
      .status(config.successStatusCode)
      .json(response("Cart updated", newProduct, config.successStatusCode));
  } catch (error) {
    console.error(error);
    res
      .status(config.badRequestStatusCode)
      .json(
        response("Unable to update  the cart", {}, config.badRequestStatusCode)
      );
  }
};

const getCartProducts = async (req: Request, res: Response) => {
  Product.find({user_id: req.body.user_id}, (err: Response, data: Response) => {
    if (err) {
      res.status(500).json({ message: "internal server problem" });
    } else {
      res.status(200).json( data );
    }
  })
}

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleteProduct: any = await Product.deleteOne({ user_id: req.body.user_id, product: req.body.product });
    res
      .status(config.successStatusCode)
      .json(response("Product is removed from the cart", deleteProduct, config.successStatusCode));
  } catch (error) {
    console.error(error);
    res
      .status(config.badRequestStatusCode)
      .json(
        response("Unable to remove the peoduct from the cart", {}, config.badRequestStatusCode)
      );
  }
};

let response = (message: string, data: any, status: number) => {
  return { message, data, status };
};

export {
  getProduct,
  addToCart,
  updateCart,
  getCartProducts,
  deleteProduct
};
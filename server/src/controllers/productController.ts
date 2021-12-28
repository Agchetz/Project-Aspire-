import { Response, Request } from "express";
import orderModel from "../models/orderModel";
import { Icart } from "../types/cart";
import Cart from "../models/cart";
import { IcartOrder } from "../types/cartOrder";
import cartOrder from "../models/cartOrder";
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
    const product: Icart = new Cart(req.body);
    const cartProduct: Icart = await product.save();
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
    const newProduct: Icart | null = await Cart.findOneAndUpdate(
      { user_id: req.body.user_id, product: req.body.product  },
      req.body,
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
  Cart.find({}, (err: Response, data: Response) => {
    if (err) {
      res.status(500).json({ message: "internal server problem" });
    } else {
      res.status(200).json( data );
    }
  })
}

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleteProduct: any = await Cart.deleteOne({ user_id: req.body.user_id, product: req.body.product });
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

const checkout = async (req: Request, res: Response): Promise<void> => {
  try {
    let body = req.body.body
    let product: IcartOrder = new cartOrder(body)
    const cartProduct: IcartOrder = await product.save();
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

}

const clearCart = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body.user_id)
    const deleteCart: any = await Cart.deleteMany({});
    res
      .status(config.successStatusCode)
      .json(response("Product is removed from the cart", deleteCart, config.successStatusCode));
  } catch (error) {
    console.error(error);
    res
      .status(config.badRequestStatusCode)
      .json(
        response("Unable to remove the product from the cart", {}, config.badRequestStatusCode)
      );
  }
};

const getcartOrders = async (req: Request, res: Response): Promise<void> => {
  cartOrder.find({}, (err: Response, data: Response) => {
    if (err) {
      console.log(err)
      res.status(500).json({ message: "internal server problem" });
    } else {
      console.log(data)
      res.status(200).json( data );
    }
  })
}

let response = (message: string, data: any, status: number) => {
  return { message, data, status };
};

export {
  getProduct,
  addToCart,
  updateCart,
  getCartProducts,
  deleteProduct,
  checkout,
  getcartOrders,
  clearCart
};
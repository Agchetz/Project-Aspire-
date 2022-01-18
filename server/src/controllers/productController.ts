import { Response, Request } from "express";
import product from "../models/productModel";
import { cartType } from "../types/cart";
import Cart from "../models/cart";
import { IcartOrder } from "../types/cartOrder";
import cartOrder from "../models/cartOrder";
const config = require("../config/config");

const getProduct = async (req: Request, res: Response): Promise<void> => {
  product.find({}, (err: Response, data: Response) => {
    if (err) {
      res.status(500).json({ message: "internal server problem" });
    } else {
      res.status(200).json(data);
    }
  });
};

const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    let isExistingCart = await Cart.find({ user_id: req.body.user_id });
    if (isExistingCart.length) {
      let temp: any = isExistingCart[0].product;
      let isAlreadyExistedProduct = false;
      let existingProducts = temp.map((element: any) => {
        if (element.product.equals(req.body.id)) {
          isAlreadyExistedProduct = true;
          element.quantity++;
        }
        return element;
      });
      let updatedProducts: any = [...existingProducts];
      if (isAlreadyExistedProduct === false) {
        updatedProducts.push({ product: req.body.id, quantity: 1 });
      }
      console.log(updatedProducts, "*******************");

      await Cart.findOneAndUpdate(
        { _id: isExistingCart[0]._id },
        { product: updatedProducts }
      );
    } else {
      const product = new Cart({
        user_id: req.body.user_id,
        product: [{ product: req.body.id, quantity: 1 }],
      });
      console.log(product, "*******************");
      const cartProduct = await product.save();
      res
        .status(200)
        .json(
          response(
            "Product added to cart",
            cartProduct,
            config.successStatusCode
          )
        );
    }
  } catch (error) {
    console.error(error);
    res
      .status(config.badRequestStatusCode)
      .json(
        response(
          "Unable to add  the product to cart",
          { error },
          config.badRequestStatusCode
        )
      );
  }
};

const updateCart = async (req: Request, res: Response): Promise<void> => {
  try {
    let demo: any = 0;
    let existedProduct: any = await Cart.find({ user_id: req.body.user_id });
    let temp = existedProduct[0].product;
    demo = temp.map((element: any) => {
      if (element._id.equals(req.body[0]._id)) {
        element.quantity = req.body[0].quantity;
      }
      return element;
    });
    console.log("**********", demo);
    let updated = await Cart.findOneAndUpdate(
      { user_id: req.body.user_id },
      { product: demo }
    );
    res
      .status(config.successStatusCode)
      .json(response("Cart updated", updated, config.successStatusCode));
  } catch (error) {
    console.error(error);
    res
      .status(config.badRequestStatusCode)
      .json(
        response("Unable to update  the cart", {}, config.badRequestStatusCode)
      );
  }
};

//todo
const getCartProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body.user_id);
    const getProduct: cartType[] | null = await Cart.find({
      user_id: req.body.user_id,
    });
    let check: any = [];
    let temp: any = getProduct[0].product;
    let demo = await temp.map(async (data: any, index: any) => {
      let test: any = await product.find({ _id: data.product });
      let testing = await test.map((element: any) => {
        return {
          _id: data._id,
          id: element._id,
          product: element.product,
          quantity: data.quantity,
          price: element.price,
          image: element.image,
        };
      });
      await check.push(testing);
      return check;
    });
    setTimeout(() => {
      res
        .status(config.successStatusCode)
        .json(response("Cart updated", check, config.successStatusCode));
    }, 500);
  } catch (error) {
    console.error(error);
    res
      .status(config.badRequestStatusCode)
      .json(
        response("Unable to update the cart", {}, config.badRequestStatusCode)
      );
  }
};

const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body);
    let temp: String | undefined | any = { _id: req.body._id };
    const deleteProduct: any = await Cart.deleteOne({ product: temp });
    console.log(deleteProduct);
    res
      .status(config.successStatusCode)
      .json(
        response(
          "Product is removed from the cart",
          deleteProduct,
          config.successStatusCode
        )
      );
  } catch (error) {
    console.error(error);
    res
      .status(config.badRequestStatusCode)
      .json(
        response(
          "Unable to remove the peoduct from the cart",
          {},
          config.badRequestStatusCode
        )
      );
  }
};

const checkout = async (req: Request, res: Response): Promise<void> => {
  try {
    let body = req.body.body;
    let temp: any = [];
    let id: any = [];
    let temp_quantity: any = [];
    let check = await body.orderdetails.map((element: any) => {
      id = element.id;
      temp_quantity = element.quantity;
      temp.push({ id: element.id, quantity: element.quantity });
      return { id, temp_quantity };
    });
    console.log(temp);
    let orderproduct: IcartOrder = new cartOrder({
      orderdetails: temp,
      user_id: req.body.user_id,
      total: req.body.total,
    });
    const cartProduct: IcartOrder = await orderproduct.save();
    res
      .status(200)
      .json(
        response("Product added to cart", cartProduct, config.successStatusCode)
      );
  } catch (error) {
    console.error(error);
    res
      .status(config.badRequestStatusCode)
      .json(
        response(
          "Unable to add  the product to cart",
          { error },
          config.badRequestStatusCode
        )
      );
  }
};

const clearCart = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body.user_id);
    const deleteCart: any = await Cart.deleteMany({
      user_id: req.body.user_id,
    });
    res
      .status(config.successStatusCode)
      .json(
        response(
          "Product is removed from the cart",
          deleteCart,
          config.successStatusCode
        )
      );
  } catch (error) {
    console.error(error);
    res
      .status(config.badRequestStatusCode)
      .json(
        response(
          "Unable to remove the product from the cart",
          {},
          config.badRequestStatusCode
        )
      );
  }
};

const getcartOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const cart = await cartOrder
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
    cart.map((data: any) => {
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
  } catch (error) {
    console.error(error);
    res
      .status(config.badRequestStatusCode)
      .json(
        response("Unable to update the cart", {}, config.badRequestStatusCode)
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
  deleteProduct,
  checkout,
  getcartOrders,
  clearCart,
};

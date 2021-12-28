import { IcartOrder } from "./../types/cartOrder";
import { model, Schema } from "mongoose";
import { productSchema } from "./product";

const cartOrderSchema: Schema = new Schema(
  {
    orderdetails:{
      type: [productSchema],
      required: true
    },
   
  },
  { timestamps: true },
);

export default model<IcartOrder>("orderCart", cartOrderSchema);

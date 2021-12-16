import { Iproduct } from "./../types/product";
import { model, Schema } from "mongoose";

const productSchema: Schema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    image: {
    type: String,
    },
    product: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    quantity: {
      trype: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<Iproduct>("Product", productSchema);

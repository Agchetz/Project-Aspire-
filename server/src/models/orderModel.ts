import { IOrder } from "./../types/order";
import { model, Schema } from "mongoose";

const orderSchema: Schema = new Schema(
  {
    product: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    stock: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["ordered", "packed", "dispatched", "delivered"],
      required: true,
    },
    image: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default model<IOrder>("Order", orderSchema);

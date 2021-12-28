import { Icart } from "./../types/cart";
import { model, Schema } from "mongoose";

const cartSchema: Schema = new Schema(
  [{

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
      type: Number,
      required: true,

    },
    price: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },],
  { timestamps: true }
);

export default model<Icart>("Cart", cartSchema);

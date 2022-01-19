import { Document } from "mongoose";

export interface cartType extends Document {
  // image: String;
  // product: String;
  // department: String;
  // price: number;
  // quantity: number
  
    user_id: {
      type: String,
      required: true,
    },
    product: [
      {
        product: {
          type: Object,
          ref: "product",
        },
        quantity: {
          type: Number,
          required: true
        }
      },
    ],
  }



import { Document } from "mongoose";

export interface cartType extends Document {
  image: String;
  product: String;
  department: String;
  price: number;
  quantity: number
}

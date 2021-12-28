import { Document } from "mongoose";

export interface Icart extends Document {
  image: String;
  product: String;
  department: String;
  price: number;
  quantity: number
}

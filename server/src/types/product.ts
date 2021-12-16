import { Document } from "mongoose";

export interface Iproduct extends Document {
  id: number;
  image: String;
  product: String;
  department: String;
  price: number;
  quantity: number
}

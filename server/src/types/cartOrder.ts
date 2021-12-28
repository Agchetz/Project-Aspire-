import { Document } from "mongoose";

export interface IcartOrder extends Document {
  image: String,
  product: String,
  department: String,
  price: number,
  quantity: number
}

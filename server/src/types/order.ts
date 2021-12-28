import { Document } from "mongoose";

export interface IOrder extends Document {
  product: String;
  department: String;
  quantity: number;
  stock: String;
  price: number;
  address: String;
  image: String;
  status: Enumerator;
}

export interface orderTestStatus {
  id: number;
  name: string;
}

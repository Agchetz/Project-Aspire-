import { Document } from "mongoose";

export interface IOrder extends Document {
  user_id: string;
  product: String;
  department: String;
  quantity: number;
  stock: String;
  price: number;
  address: String;
  status: Enumerator;
}

export interface orderTestStatus {
  id: number;
  name: string;
}

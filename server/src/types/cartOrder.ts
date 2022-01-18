import { Document } from "mongoose";

export interface IcartOrder extends Document {
  orderdetails: Object
  user_id: String
}

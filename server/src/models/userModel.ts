import { IUser } from "./../types/user";
import { model, Schema } from "mongoose";

const userSchema: Schema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IUser>("IUser", userSchema);

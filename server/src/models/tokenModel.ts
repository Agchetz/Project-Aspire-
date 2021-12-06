import { IToken } from "./../types/token";
import { model, Schema } from "mongoose";

const tokenSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    }
  },
  { timestamps: true }
);

export default model<IToken>("IToken", tokenSchema);



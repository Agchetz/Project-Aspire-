export interface newUserModel {
  userName: String;
  phoneNumber: Number;
  email: String;
  password: String;
}

export interface loginModel {
  email: String;
  password: String;
}

export interface orderModel {
  id: number;
  product: String;
  department: String;
  quantity: Number;
  stock: String;
  price: Number;
  address: String;
}

export interface orderDetailsModel {
  id: Number;
  product: String;
  department: String;
  quantity: Number;
  price: Number;
  stock: String;
  address: String;
  updatedAt: Date;
  user_id: Number;
  image: File;
  __v: Number;
  _id: Number;
}

export interface loginDetails {
  data: 
    [{ expiresIn: number, token: string }, string, string];
    message: string;
    status: number;
}

export interface orderTestStatus
 {
    _id: string,
    total: number 
  }[]

export interface userModel {
  email: string
  role: string[]
}

export interface productModel {
  id: number,
  product: String,
  department: String,
  quantity: Number,
  price: Number,
  user_id: String,
  image: File
}
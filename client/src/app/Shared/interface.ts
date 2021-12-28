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
  image: String
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
  image: String;
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
  product: String,
  department: String,
  quantity: number,
  price: number,
  image: String,
  _id: String
}


export interface cartOrder {
  image: String;
  product: String;
  department: String;
  price: number;
  quantity: number
}[]
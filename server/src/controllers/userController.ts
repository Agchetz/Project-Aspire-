import { Response, Request } from "express";
import { IUser } from "./../types/user";
import User from "../models/userModel";
import Token from "../models/tokenModel"
import { IToken } from "../types/token";
import { checkJwt, tokenVerify } from "../middleware/checkJwt";
const nodemailer = require('nodemailer')
const authModel = require('../models/authmodel')
const config = require("../config/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const getUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const users: IUser[] = await User.find();
    return res
      .status(config.successStatusCode)
      .json(
        response("Users returned successfully", users, config.successStatusCode)
      );
  } catch (error) {
    return res
      .status(config.badRequestStatusCode)
      .json(
        response("Unable to get  the user", {}, config.badRequestStatusCode)
      );
  }
};

const createUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body as Pick<
      IUser,
      "userName" | "phoneNumber" | "email" | "password" | "role"
    >;
    const user: IUser = new User({
      userName: body.userName,
      phoneNumber: body.phoneNumber,
      email: body.email,
      password: bcrypt.hashSync(body.password.toString(), 10),
      role: body.role
    });
    let userExist: null | object;
    userExist = await checkEmail(body.email);
    if (userExist) {
      return res
        .status(config.badRequestStatusCode)
        .json(
          response("User already exist", body, config.badRequestStatusCode)
        );
    }
    const newUser: IUser = await user.save();
    if(user.role === "Admin"){
      return res
      .status(config.successStatusCode)
      .json(response("New admin added", newUser, config.successStatusCode));
    }if(user.role === "Customer"){
    return res
      .status(config.successStatusCode)
      .json(response("New customer added", newUser, config.successStatusCode));
    }
  } catch (error) {
    return res
      .status(config.badRequestStatusCode)
      .json(
        response("Unable to create the user", {}, config.badRequestStatusCode)
      );
  }
};

const checkEmail = async (email: string) => {
  try {
    const users: null | object = await User.findOne({ email: email });
    return users;
  } catch (error) {
    return null;
  }
};

const login = async (req: Request, res: Response): Promise<any> => {
  try {
    console.log(req.body.email)
    const users: any = await User.findOne({ email: req.body.email });
    console.log(users)
    if (!users) {
      return res
        .status(config.badRequestStatusCode)
        .json(response("user not exist", req.body, config.successStatusCode));
    }
    if (!(await bcrypt.compare(req.body.password, users.password))) {
      return res
        .status(config.badRequestStatusCode)
        .json(
          response("Invalid password", req.body, config.badRequestStatusCode)
        );
    }
    return res
      .status(config.successStatusCode)
      .json(
        response(
          "Users returned successfully",
          [createToken(users), users.userName, users.role],
          config.successStatusCode
        )
      );
  } catch (error) {
    return res
      .status(config.badRequestStatusCode)
      .json(response("Unable to login", {}, config.badRequestStatusCode));
  }
};


const postForgotPassword = async (req:Request, res: Response): Promise<any>=>{
  try {
    const users: any = await User.findOne({ email: req.body.email });
    if (!users) {
      return res
        .status(config.badRequestStatusCode)
        .json(response("user not exist", req.body, config.successStatusCode));
    }
    const token = createToken(users)
    console.log(token)
    const itoken: IToken = new Token({email:req.body.email,token:token.token})
    const newToken: IToken = await itoken.save()
    if(users){
      sendMail(req.body.email, token.token, 'New Password')
    }
    return res
      .status(config.successStatusCode)
      .json(response("Users returned successfully",
          [token, users.userName],
          config.successStatusCode
        )
      );
    
  } catch (error) {
    return res
      .status(config.badRequestStatusCode)
      .json(response("Unable to login", {}, config.badRequestStatusCode));
  }
 }

let response = (message: string, data: any, status: number) => {
  return { message, data, status };
};

const createToken = (user: any): any => {
  const expiresIn = '2h';
  const secret = config.jwtSecret;
  return {
    expiresIn,
    token: jwt.sign({ id: user._id, email: user.email, userName: user.userName, role: user.role }, secret, { expiresIn }),
  };
};


let sendMail = async (email: any, token: any, subject: string):Promise<any> => {
    try{  
      var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'demotest5597@gmail.com',
              pass: 'demotest143'
          }
      });
      let Link = "http://localhost:4200/resetPassword"
      var mailOptions = {
          from: 'agchetz@gmail.com',
          to: email,
          subject: 'New Password',
          text:`
          Hi,

          Greetings.

          Your password link is generated. You can create a new password by clicking on this link. It will be valid for 30mins only.
          Link: ${Link}/${token}`
      }
      await transporter.sendMail(mailOptions)
    }catch(error){
      return console.log(error)
    }
}

let checkUser = async (req: Request, res: Response):Promise<any> => {
  try{
    let token = req.params.token
    tokenVerify(req, res)
    return  res
    .status(config.successStatusCode)
    .json(response("Authorized user",{}, config.successStatusCode));
  }catch(error){
    console.log(error)
    return res
      .status(config.badRequestStatusCode)
      .json(
        response("Unauthorized user", {}, config.badRequestStatusCode)
      );
  }
}

let updatePassword = async (req:Request, res: Response):Promise<any> => {
  try {
    const token = req.params.token
    const password = bcrypt.hashSync(req.body.password.toString(), 10)
    let user_id:any = await tokenVerify(req, res)
    console.log(user_id)
    let change = await User.findOneAndUpdate({_id:user_id}, {password})
    res
      .status(config.successStatusCode)
      .json(response("Password Changed",{}, config.successStatusCode));
  } catch (error) {
    console.error(error);
    res
      .status(config.badRequestStatusCode)
      .json(
        response("Unable to change  the password", {}, config.badRequestStatusCode)
      );
  }
}



export { getUser, createUser, login, postForgotPassword, checkUser, updatePassword };

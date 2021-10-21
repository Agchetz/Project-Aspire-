import {Response, Request} from 'express'
import {IUser} from './../types/user'
import User from '../models/userModel'
const config  = require( "../config/config");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const getUser = async (req: Request, res: Response): Promise<any> => {
    try{
        const users: IUser[] = await User.find()
        return res.status(config.successStatusCode).json({
            status: 200,
            message: "Users returned successfully",
            data: users
        })
    } catch (error) {
        return res.status(config.badRequestStatusCode).json({
            message: 'Unable to get  the user',
            data: {},
            status: config.badRequestStatusCode
        })
    }
}

const createUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const body = req.body as Pick<IUser, 'userName' | 'phoneNumber' |'email' | 'password'>
        const user: IUser = new User({
            userName: body.userName,
            phoneNumber: body.phoneNumber,
            email: body.email,
            password: bcrypt.hashSync(body.password.toString(), 10),
        })
        let userExist: null | object;
        userExist = await checkEmail(body.email);
        if (userExist) {
            return res.status(config.badRequestStatusCode).json({
                message: 'User already exist',
                data: body,
                status: config.badRequestStatusCode
            })
        }
        const newUser: IUser = await user.save()
        return res.status(config.successStatusCode).json({message: 'User added', data: newUser, status: 200})
    } catch (error) {
        return res.status(config.badRequestStatusCode).json({
            message: 'Unable to create the user',
            data: {},
            status: config.badRequestStatusCode
        })
    }
}

const checkEmail = async (email: string) => {
    try {
        const users: null | object = await User.findOne({email: email})
        return users;
    } catch (error) {
        return null;
    }
}

const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const users: any = await User.findOne({email: req.body.email});
        if (!users) {
            return res.status(config.badRequestStatusCode).json({status: 200, message: "user not exist", data: req.body})
        }
        if (!await bcrypt.compare(req.body.password, users.password)) {
            return res.status(config.badRequestStatusCode).json({
                status: 400,
                message: "Invalid password",
                data: req.body
            })
        }
        return res.status(config.successStatusCode).json({
            status: 200,
            message: "Users returned successfully",
            data: [createToken(users), users.userName]
        })

    } catch (error) {
        return res.status(config.badRequestStatusCode).json({
            message: 'Unable to login',
            data: {},
            status: config.badRequestStatusCode
        })
    }
}
const createToken = (user: any): any => {
    const expiresIn = 60 * 60;
    const secret = "123456789";
    return {
        expiresIn,
        token: jwt.sign({"id": user._id, email: user.email}, secret, {expiresIn}),
    };
}
export {getUser, createUser, login}

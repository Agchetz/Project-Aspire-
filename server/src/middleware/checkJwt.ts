import { Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
const config = require("../config/config");

export const checkJwt = (req: any, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  let token = <any>req.headers["authorization"];
  console.log("token -" + token);
  let jwtPayload;
  token = token.split(" ");
  token = token[1];

  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(
      token,
      config.jwtSecret,
      (err: any, payload: any) => {
        if (err) {
          res
            .status(config.unAuthStatusCode)
            .json({ message: "please  login", data: {}, status: 401 });
        } else {
          req.body["user_id"] = payload.id;
        }
      }
    );
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res
      .status(config.unAuthStatusCode)
      .json({ message: "please login", data: {}, status: 401 });
    return;
  }

  next();
};

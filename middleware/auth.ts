import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import config from "config";
import EnvKeys from "../config/env-keys";
import { UserType } from "../models/User";

const auth: RequestHandler<any> = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res.status(401).send("Access denied. No token provided.");
    const decoded = jwt.verify(token, config.get(EnvKeys.jwtPrivateKey));
    (req as any as { user: UserType }).user = decoded as UserType;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

export default auth;

import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { UserType } from "../models/User";
import config from "config";

const auth: RequestHandler<any> = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    (req as any as { user: UserType }).user = decoded as UserType;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

export default auth;

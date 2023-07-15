import { RequestHandler } from "express";
import { UserType } from "../models/User";

const isAdmin: RequestHandler = async (req, res, next) => {
  const user = (req as any as { user: UserType }).user;
  if (!user.isAdmin) return res.status(403).send("Access denied.");
  next();
};

export default isAdmin;

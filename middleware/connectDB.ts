import { RequestHandler } from "express";
import { connect } from "mongoose";

const connectDB: RequestHandler<any> = async (req, res, next) => {
  await connect("mongodb://localhost/store");
  next();
};

export default connectDB;

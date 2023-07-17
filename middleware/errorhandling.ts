import { ErrorRequestHandler } from "express";

const errorhandling: ErrorRequestHandler = async (error, req, res, next) => {
  res.status(500).send("Internal Server Error");
};

export default errorhandling;

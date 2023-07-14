import { Response } from "express";
import { Error } from "mongoose";

export function delay(t: number, val?: any) {
  return new Promise((resolve) => setTimeout(resolve, t, val));
}

export function ValidationError(res: Response<any>, ex?: any) {
  const val = ex as Error.ValidationError | undefined;
  return (
    val?.name === "ValidationError" &&
    res
      .status(400)
      .send(Object.keys(val.errors).map((key) => val.errors[key].message))
  );
}

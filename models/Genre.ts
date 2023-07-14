import { Schema, model } from "mongoose";
import { locator } from "./base";
import { ModelRef } from ".";

type GenreType = locator & {
  name: string;
  year: number;
};

const Genre = model<GenreType>(
  ModelRef.Genre,
  new Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    year: {
      type: Number,
      required: true,
    },
  })
);

export { GenreType };
export default Genre;

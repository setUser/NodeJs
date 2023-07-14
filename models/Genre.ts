import { Schema, model } from "mongoose";
import { locator } from "./base";

type GenreType = locator & {
  name: string;
};

const Genre = model<GenreType>(
  "Genre",
  new Schema({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  })
);

export { GenreType };
export default Genre;

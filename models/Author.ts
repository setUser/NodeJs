import { model, Schema } from "mongoose";
import { locator } from "./base";
import { ModelRef } from ".";

type AuthorType = locator & {
  name: string;
  bio: string;
  website: string;
};

const Author = model<AuthorType>(
  ModelRef.Author,
  new Schema({
    name: String,
    bio: String,
    website: String,
  })
);

export { AuthorType };
export default Author;

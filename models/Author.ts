import { model, Schema } from "mongoose";
import { locator, ModelRef } from "./base";

type AuthorType = locator & {
  name: string;
  bio: string;
  website: string;
};

const AuthorSchema = new Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = model<AuthorType>(ModelRef.Author, AuthorSchema);

export { AuthorType, AuthorSchema };
export default Author;

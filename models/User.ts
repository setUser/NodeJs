import config from "config";
import jwt from "jsonwebtoken";
import { Schema, model } from "mongoose";
import { ModelRef, locator } from "./base";
import EnvKeys from "../config/env-keys";

type UserType = locator & {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
};

const UserSchema = new Schema<UserType>({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});

function GenerateAuthToken(user: UserType) {
  const token = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    config.get(EnvKeys.jwtPrivateKey)
  );
  return token;
}

const User = model<UserType>(ModelRef.User, UserSchema);

export default User;
export { UserType, UserSchema, GenerateAuthToken };

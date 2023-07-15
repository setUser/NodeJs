import config from "config";
import jwt from "jsonwebtoken";
import { Schema, model } from "mongoose";
import { ModelRef, locator } from "./base";

type UserType = locator & {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
};

const UserSchema = new Schema({
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

UserSchema.methods.generateAuthToken = function () {
  const user = this as any as UserType;
  const token = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = model(ModelRef.User, UserSchema);

export default User;
export { UserType, UserSchema };

import bcrypt from "bcrypt";
import _ from "lodash";
import auth from "../middleware/auth";
import express from "express";
import User, { GenerateAuthToken, UserType } from "../models/User";
import { ValidationError } from "../utils/functions";
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  try {
    const auth = (req as any as { user: UserType }).user;
    const user = await User.findById(auth._id).select("-password");
    res.send(user);
  } catch (error) {
    return ValidationError(res, error);
  }
});

router.post("/", async (req, res) => {
  try {
    const body: { name: string; email: string; password: string } = req.body;
    if (await User.findOne({ email: body.email }))
      return res.status(400).send("User already registered.");
    const user = new User(_.pick(body, ["name", "email", "password"]));
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
    await user.save();
    res
      .header("x-auth-token", GenerateAuthToken(user))
      .send(_.pick(user, ["_id", "name", "email"]));
  } catch (error) {
    return ValidationError(res, error);
  }
});

export default router;

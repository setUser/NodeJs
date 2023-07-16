import bcrypt from "bcrypt";
import express from "express";
import _ from "lodash";
import User, { GenerateAuthToken } from "../models/User";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const body: { email: string; password: string } = req.body;
    const user = await User.findOne({ email: body.email });
    if (!user) throw new Error("InvalidEmail");
    const valid = await bcrypt.compare(body.password, user.password);
    if (!valid) throw new Error("InvalidPassword");
    res.send(GenerateAuthToken(user));
  } catch (error) {
    return res.status(400).send("Invalid email or password.");
  }
});

export default router;

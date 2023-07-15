import bcrypt from "bcrypt";
import express from "express";
import _ from "lodash";
import User from "../models/User";
const router = express.Router();

router.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  // const token = user.generateAuthToken();
  // res.send(token);
  res.send(true);
});

export default router;

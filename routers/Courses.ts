import express = require("express");
import Course from "../models/Course";
const router = express.Router();

router.get("/", async (req, res) => {
  const courses = await Course.find();
  return res.status(200).json(courses);
});

export default router;

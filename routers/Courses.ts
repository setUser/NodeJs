import express = require("express");
import Course from "../models/Course";
const router = express.Router();

router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.send(courses);
});

export default router;

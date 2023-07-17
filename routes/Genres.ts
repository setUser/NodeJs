import express = require("express");
import Genre from "../models/Genre";
import { ValidationError } from "../utils/functions";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const genres = await Genre.find().sort("name");
    return res.send(genres);
  } catch (error) {
    ValidationError(res, error);
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);
    return genre ? res.send(genre) : res.status(404).send("ID not found");
  } catch (error) {
    return ValidationError(res, error);
  }
});

router.post("/", async (req, res) => {
  try {
    const genre = await new Genre(req.body).save();
    return res.send(genre);
  } catch (error) {
    return ValidationError(res, error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    await new Genre(req.body).validate();
    const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return genre ? res.send(genre) : res.status(404).send("ID not found");
  } catch (error) {
    return ValidationError(res, error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    return genre ? res.send(genre) : res.status(404).send("ID not found");
  } catch (error) {
    return ValidationError(res, error);
  }
});

export default router;

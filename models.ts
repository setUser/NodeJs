import { Schema, model } from "mongoose";

type locator = {
  _id?: string;
  __v?: number;
};

type CourseType = locator & {
  name?: string;
  price?: number;
  author?: string;
  tags?: string[];
  date?: Date;
  isPublished?: boolean;
};

const Course = model<CourseType>(
  "Course",
  new Schema({
    name: String,
    price: Number,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
  })
);

export { CourseType, Course };

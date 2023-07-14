import { Schema, SchemaTypeOptions, model } from "mongoose";
import { locator } from "./base";
import { ModelRef } from ".";
import { AuthorType } from "./Author";

type CourseType = locator & {
  name: string;
  category: "web" | "mobile" | "network";
  price?: number;
  author: string | AuthorType;
  tags: Array<string>;
  date?: Date;
  isPublished?: boolean;
};

const Course = model<CourseType>(
  ModelRef.Course,
  new Schema<CourseType>({
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      // match: /pattern/
    } as SchemaTypeOptions<string>,
    category: {
      type: String,
      required: true,
      enum: ["web", "mobile", "network"],
      lowercase: true,
      trim: true,
    } as SchemaTypeOptions<string>,
    price: {
      type: Number,
      required: function () {
        return this.isPublished;
      },
      min: 10,
      max: 200,
      get: (value) => Math.round(value),
      set: (value) => Math.round(value),
    } as SchemaTypeOptions<number>,
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: ModelRef.Author,
    } as SchemaTypeOptions<any>,
    tags: {
      type: Array<String>,
      validate: {
        validator: async function (value: Array<String>) {
          // await delay(1000);
          const result = (value?.length > 0) as any;
          return result;
        },
        message: "Course need at least one Tag",
      },
    } as SchemaTypeOptions<ArrayConstructor>,
    date: { type: Date, default: Date.now },
    isPublished: {
      type: Boolean,
      default: false,
    },
  })
);

export { CourseType };
export default Course;

import { Schema, SchemaTypeOptions, model } from "mongoose";
import { locator } from "./base";
import { ModelRef } from ".";
import { AuthorType } from "./Author";
import { GenreSchema, GenreType } from "./Genre";

type CourseType = locator & {
  name: string;
  category: "web" | "mobile" | "network";
  price?: number;
  author: string | AuthorType;
  genres: Array<GenreType>;
  tags: Array<string>;
  date?: Date;
  isPublished?: boolean;
};

const CourseSchema = new Schema<CourseType>({
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
    ref: ModelRef.Author,
    required: true,
  } as SchemaTypeOptions<AuthorType>,
  genres: {
    type: [GenreSchema],
    required: true,
  } as SchemaTypeOptions<Array<GenreType>>,
  tags: {
    type: Array<String>,
    validate: {
      validator: async function (value: Array<String>) {
        // await delay(1000);
        const result = value?.length > 0;
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
});

const Course = model<CourseType>(ModelRef.Course, CourseSchema);

export { CourseType, CourseSchema };
export default Course;

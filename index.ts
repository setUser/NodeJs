import { Error, connect } from "mongoose";
import { Course, CourseType } from "./models";

(async () => {
  const connection = await connect("mongodb://localhost");
  try {
    // const result = await Course.find();
    const result = await new Course({
      name: "ANggt",
      category: "mobile",
      author: "",
      tags: [],
      isPublished: true,
      price: 1,
    } satisfies CourseType).save();
    console.log(result);
  } catch (ex) {
    const validatorError = ex as Error.ValidatorError;
    console.error(validatorError.message);
  } finally {
    connection.disconnect();
  }
})();

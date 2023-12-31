import Course, { CourseType } from "../models/Course";
import seed from "./seed";
import Author from "../models/Author";

export default class tips {
  static ApplySeed() {
    return Promise.all(seed.map((c) => new Course(c).save()));
  }
  static FindQuery() {
    return Course.find({
      name: /^/,
    })
      .or([
        { author: "" },
        { isPublished: true, price: { $gte: 10 } },
        { tags: { $in: ["fronted", "backend"] } },
      ])
      .skip(11)
      .limit(10)
      .sort({ name: 1 })
      .populate("author")
      .select({ name: 1, author: 1 });
  }
  static CountQuery() {
    return Course.find().count();
  }
  static FindThenUpdate() {
    Course.findById("5a68fdc3615eda645bc6bdec").then((course) => {
      if (course?.price) course.price += 5;
      return course?.save();
    });
  }
  static UpdateByIDAndGetUpdated() {
    return Course.findByIdAndUpdate(
      "5a68fdc3615eda645bc6bdec",
      {
        $set: {
          author: "Updated",
        },
      },
      {
        //GetUpdated
        new: true,
      }
    );
  }
  static UpdateByQuery() {
    return Course.updateOne(
      { _id: "5a68fdc3615eda645bc6bdec" },
      {
        $set: {
          author: "Updated",
        },
      }
    );
  }
  static RemoveByID() {
    return Course.findByIdAndRemove("5a68fdc3615eda645bc6bdec");
  }
  static RemoveByQuery() {
    return Course.deleteOne({ _id: "5a68fdc3615eda645bc6bdec" });
  }
  static ValidateModel() {
    return new Course({ name: "" }).validate();
  }
  static async AddCourseWithAuthor() {
    const author = await new Author({ name: "REAL" }).save();
    const course = await new Course({
      name: "ashasifu",
      tags: ["sedf"],
      category: "mobile",
      author: author,
      genres: [],
    } satisfies CourseType).save();
    console.log(await Course.find().populate("author"));
  }
}

import { Course } from "./models";
import seed from "./seed/seed";

export default class tips {
  ApplySeed() {
    return Promise.all(seed.map((c) => new Course(c).save()));
  }
  FindQuery() {
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
      .select({ name: 1, author: 1 });
  }
  CountQuery() {
    return Course.find().count();
  }
  FindThenUpdate() {
    Course.findById("5a68fdc3615eda645bc6bdec").then((course) => {
      if (course) course.price += 5;
      return course.save();
    });
  }
  UpdateByIDAndGetUpdated() {
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
  UpdateByQuery() {
    return Course.updateOne(
      { _id: "5a68fdc3615eda645bc6bdec" },
      {
        $set: {
          author: "Updated",
        },
      }
    );
  }
  RemoveByID() {
    return Course.findByIdAndRemove("5a68fdc3615eda645bc6bdec");
  }
  RemoveByQuery() {
    return Course.deleteOne({ _id: "5a68fdc3615eda645bc6bdec" });
  }
  ValidateModel() {
    return new Course({ name: "" }).validate();
  }
}

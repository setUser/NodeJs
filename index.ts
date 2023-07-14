import { Schema, connect } from "mongoose";

const CourseSchema = new Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

(async () => {
  const connection = await connect("mongodb://localhost");
  try {
    console.log(connection);
  } catch (error) {
    console.error(error);
  } finally {
    connection.disconnect();
  }
})();

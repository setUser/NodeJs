import { connect } from "mongoose";
import { Course } from "./models";

(async () => {
  const connection = await connect("mongodb://localhost");
  try {
    console.log(await Course.find());
  } catch (error) {
    console.error(error);
  } finally {
    connection.disconnect();
  }
})();

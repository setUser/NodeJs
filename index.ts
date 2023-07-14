import express = require("express");
import { connect } from "mongoose";
import Courses from "./routers/Courses";
import Genres from "./routers/Genres";

(async () => {
  const connection = await connect("mongodb://localhost/store");
  try {
    const app = express();
    app.use(express.json());
    app.use("/api/courses", Courses);
    app.use("/api/genres", Genres);
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listening on port ${port}...`));
  } catch (ex) {
    console.error(ex);
  } finally {
    connection.disconnect();
  }
})();

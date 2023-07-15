import express, { Express } from "express";
import dotenv from "dotenv";
import Courses from "./routes/Courses";
import Genres from "./routes/Genres";
import connectDB from "./middleware/connectDB";
import Helmet from "helmet";
import Morgan from "morgan";
import Users from "./routes/Users";
import Auth from "./routes/Auth";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(express.static("public")); // serve static files

// app.set("view engine", "pug"); // Pug is a high performance template engine heavily influenced by Haml
// app.set("views", "./views"); // set views files
// app.get("/", (req, res) =>
//   res.render("home", { title: "Template", message: "Data" })
// );

app.use(Helmet()); // helps secure Express apps by setting HTTP response headers.
app.use(Morgan("dev")); // logger HTTP middleware for node.js

app.use(connectDB); // to support Mongo DB connection
app.use("/api/courses", Courses);
app.use("/api/genres", Genres);
app.use("/api/users", Users);
app.use('/api/auth', Auth);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

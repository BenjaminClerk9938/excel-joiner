const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const morgan = require("morgan");

const routes = require("./routes");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

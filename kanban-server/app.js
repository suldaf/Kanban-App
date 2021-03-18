if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const routes = require("./routes");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.use(errorHandler);

app.listen(port, () => console.log(`Listenig app at port: ${port}`));

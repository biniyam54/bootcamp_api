const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDb = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");

//load env vars
dotenv.config({ path: "./config/.env" });

//connect database
connectDb();

const app = express();

//body parser
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/bootcamps", require("./routes/bootcamps"));

//middlewares
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(
    `Server started in ${process.env.NODE_ENV} mode on port ${PORT}`.bold.yellow
  )
);

//Handle unhandled promises rejections
process.on("unhandledRejection", (err, promises) => {
  console.log(`Error: ${err.message}`.red);
  server.close(() => process.exit(1));
});

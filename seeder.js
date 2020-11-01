const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

//Load vars
dotenv.config({ path: "./config/.env" });

//Load models
const Bootcamp = require("./models/Bootcamp");
const Coarse = require("./models/Coarse");

//connectDb
mongoose.connect(process.env.MONGO_URI, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//   read JSON
const bootcamps = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);
const coarses = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/coarses.json`, "utf-8")
);

//Import into db
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    // await Coarse.create(coarses);
    console.log(`Data Imported...`.green.inverse);
    process.exit(1);
  } catch (err) {
    console.error(err);
  }
};

//Destroy Data
const destroyData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Coarse.deleteMany();
    console.log(`Data Destroyed...`.red.inverse);
    process.exit(1);
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  destroyData();
}

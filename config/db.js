const mongoose = require("mongoose");

const connectDb = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`mongoDB connected: ${conn.connection.host}`);
};

module.exports = connectDb;

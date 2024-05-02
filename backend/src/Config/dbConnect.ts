const mongoose = require("mongoose");

export const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(console.log("Database Connected"));
  } catch (err) {
    console.error(err);
  }
};

export default connectDB;

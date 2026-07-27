import mongoose from "mongoose";

const databaseconnect = async () => {
  const url = process.env.CONNECTION_STRING;

  try {
    console.log("Connecting to:", url);
    await mongoose.connect(url);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection failed", err);
  }
};

export default databaseconnect;
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://armistech:nodejs@cluster0.g1mwa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to the database successfully !");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;

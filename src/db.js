import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("data base connected succesfuly".bgMagenta);
  } catch (err) {
    console.log("failed to connect to data base".bgRed);
  }
};

export default connectDB;

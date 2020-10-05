import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./db";
import morgan from "morgan";
import errorHandler from "./middleware/error";
import cookieParser from "cookie-parser";

import auth from "./routes/auth";
import chat from "./routes/chat";

const app = express();

dotenv.config({ path: ".env" });

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

app.use(morgan("dev"));

app.use("/api/v1/auth", auth);
app.use("/api/v1/chat", chat);

app.use(errorHandler);

connectDB();

app.listen(process.env.PORT, () =>
  console.log("server running succesfuly".bgGreen)
);

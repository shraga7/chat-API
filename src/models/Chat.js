import mongoose from "mongoose";
import MessageSchema from "./Message";

const schema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please included chat participant"],
    },
  ],
  messages: [MessageSchema.schema],
  creationTime: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Chat", schema);

import mongoose, { Schema } from "mongoose";

const schema = new mongoose.Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please include reciver id"],
  },
  content: {
    type: String,
    required: [true, "Please add content to your message"],
  },
  status: {
    type: String,
    enum: ["seen", "unseen"],
    default: "unseen",
  },
  creationTime: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Message", schema);

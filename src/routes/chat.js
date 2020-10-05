import express from "express";
import {
  sendMessage,
  readMessage,
  deleteMessage,
  getChats,
  getUserUnreadMessages,
} from "../controllers/chat";
import { protect } from "../middleware/auth";

const router = express.Router();

router.route("/message").post(protect, sendMessage);

router.route("/:chatId/message").get(protect, readMessage);

router.route("/:chatId/message/:messageId").delete(protect, deleteMessage);

router.route("/").get(protect, getChats);

router.route("/:chatId/message/unread").get(protect, getUserUnreadMessages);

export default router;

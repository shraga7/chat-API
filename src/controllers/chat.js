import asyncHandler from "../middleware/async";
import ErrorResponse from "../utils/ErrorResponse";
import Chat from "../models/Chat";
import User from "../models/User";
import Message from "../models/Message";
import { getUnreadMessage, getUnreadMessages } from "../utils/chat";
import { STATUS_SEEN } from "../consts/message";

export const sendMessage = asyncHandler(async (req, res, next) => {
  const { receiver, content } = req.body;
  const user = await User.findById(req.user.id);

  const sender = req.user.id;

  const message = new Message();
  message.content = content;
  message.receiver = receiver;
  message.sender = sender;

  let chat;

  // find participant's chat
  chat = await Chat.findOne({
    participants: [sender, receiver],
  }).exec();

  // check if chat exists
  if (!chat) {
    chat = await Chat.create({ participants: [sender, receiver] });
    const insertObj = {
      $push: { chats: chat["_id"] },
    };
    await User.findByIdAndUpdate(sender, insertObj);
    await User.findByIdAndUpdate(receiver, insertObj);
  }

  chat.messages.push(message);

  await chat.save();

  res.status(200).json({ success: true, chat });
});

export const readMessage = asyncHandler(async (req, res, next) => {
  const chatId = req.params.chatId;
  const chat = await Chat.findById(chatId);

  if (!chat) {
    return next(new ErrorResponse("Given chat id not exists", 404));
  }
  const unreadMessage = getUnreadMessage(chat.messages, req.user.id);
  if (!unreadMessage) {
    return next(
      new ErrorResponse("Whole messages of this chat have been read", 400)
    );
  }

  unreadMessage.status = STATUS_SEEN;
  await chat.save();
  res.status(200).json({
    success: true,
    unreadMessage,
  });
});

export const deleteMessage = asyncHandler(async (req, res, next) => {
  const { chatId, messageId } = req.params;
  const deletedMessage = await Chat.update(
    { _id: chatId },
    { $pull: { messages: { _id: messageId } } }
  );

  res.status(200).json({ success: true, deletedMessage });
});

export const getChats = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate("chats");
  res.status(200).json({ success: true, user });
});

export const getUserUnreadMessages = asyncHandler(async (req, res, next) => {
  const chatId = req.params.chatId;
  const chat = await Chat.findById(chatId);
  const unreadMessages = getUnreadMessages(chat.messages, req.user.id);

  res.status(200).json({ success: true, unreadMessages });
});

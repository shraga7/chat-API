import { STATUS_UNSEEN } from "../consts/message";

export const getUnreadMessage = (messages, receiver) => {
  for (let message of messages) {
    if (
      message.status === STATUS_UNSEEN &&
      String(message.receiver) === receiver
    ) {
      return message;
    }
  }
};

export const getUnreadMessages = (messages, receiver) => {
  const unreadMessages = messages.filter((message) => {
    return receiver === message.receiver && message.status === STATUS_UNSEEN;
  });
};

import React from "react";
import "./Message.scss";

function Message({ username, messageContent }) {
  const isMyMessage = username === messageContent.author;
  const messageClassName = isMyMessage ? "message me" : "message companion";
  const textClassName = isMyMessage ? "text me" : "text companion";
  const metaClassName = isMyMessage ? "meta me" : "meta companion";

  return (
    <div className={messageClassName}>
      <p className={textClassName}>{messageContent.message}</p>
      <p className={metaClassName}>
        {messageContent.author} {messageContent.time}
      </p>
    </div>
  );
}

export default Message;

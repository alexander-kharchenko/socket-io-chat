import { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import "./Chat.scss";
import Message from "../Message/Message";

function Chat({ socket, username, room }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const messagesEndRef = useRef();
  const buttonDisabled = message === "";

  const handleSetMessage = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = async () => {
    if (!buttonDisabled) {
      const messageData = {
        room,
        author: username,
        message,
        time: `${new Date(Date.now()).getHours()}:${new Date(
          Date.now(),
        ).getMinutes()}`,
      };

      await socket.emit("send_message", messageData);
      setMessageList((prevState) => [...prevState, messageData]);
      setMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((prevState) => [...prevState, data]);
    });
  }, [socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messageList]);

  return (
    <div className="chat">
      <div className="chat-header">
        <p className="chat-name">Live Chat</p>
      </div>
      <div className="chat-body">
        {messageList.map((messageContent) => (
          <Message
            key={v4()}
            username={username}
            messageContent={messageContent}
          />
        ))}
        <div ref={messagesEndRef} className="messages-end" />
      </div>
      <form className="chat-footer">
        <input
          type="text"
          placeholder="Say something nice"
          className="message-input"
          value={message}
          onChange={handleSetMessage}
        />
        <button
          type="submit"
          className="send-button"
          disabled={buttonDisabled}
          onClick={sendMessage}
        >
          &#9658;
        </button>
      </form>
    </div>
  );
}

export default Chat;

import { useState } from "react";
import io from "socket.io-client";
import "./App.scss";
import Chat from "./components/Chat/Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const handleSetUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleSetRoom = (event) => {
    setRoom(event.target.value);
  };

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="app">
      {showChat ? (
        <Chat socket={socket} username={username} room={room} />
      ) : (
        <form className="auth-form">
          <h1 className="form-title">Start a chat</h1>
          <input
            type="text"
            placeholder="Name"
            className="auth-input"
            value={username}
            onChange={handleSetUsername}
          />
          <input
            type="text"
            placeholder="Room ID"
            className="auth-input"
            value={room}
            onChange={handleSetRoom}
          />
          <button type="submit" className="join-button" onClick={joinRoom}>
            Join Chat
          </button>
        </form>
      )}
    </div>
  );
}

export default App;

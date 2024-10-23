const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User with id ${socket.id} connected`);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log(`User with id ${socket.id} joined room ${room}`);
  });

  socket.on("send_message", (messageData) => {
    socket.to(messageData.room).emit("receive_message", messageData);
  });

  socket.on("disconnect", () => {
    console.log(`User with id ${socket.id} disconnected`);
  });
});

server.listen(3001, () => {
  console.log("Server is running");
});

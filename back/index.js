const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  const username = socket.handshake.query.username;

  console.log(`user ${username} connected`);
  
  socket.on("disconnect", (data) => {
    console.log(`user ${username} disconnected`);
      io.emit("message", {
      id: data.id,
      username: "Pepi-bot",
      text: `${username} has left the chat`,
    });
  });
  
  socket.on("send-message", (data) => {
    const messageData = {
      id: socket.id,
      username: data.username,
      text: data.text,
    };
    console.log("Received message:", messageData);
    io.emit("message", messageData);
  });

});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
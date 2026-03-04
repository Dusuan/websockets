const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

// Initialize Socket.io with specific CORS rules for the frontend (Vite's default port)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // Grab the username passed from the client
  const username = socket.handshake.query.username;

  console.log(`user ${username} connected`);
  
  // Notify the chat room when someone disconnects
  socket.on("disconnect", (reason) => {
    console.log(`user ${username} disconnected. Reason : ${reason}`);
    
    // Broadcast exit message via the 'Pepi-bot' account
    io.emit("message", {
      id: socket.id, 
      username: "Pepi-bot",
      text: `${username} has left the chat`,
    });
  });
  
  // Listen for incoming chat messages
  socket.on("send-message", (data) => {
    // Structure the payload—using the socket's unique ID for tracking
    const messageData = {
      id: socket.id,
      username: data.username,
      text: data.text,
    };
    
    console.log("Received message:", messageData);
    
    // Send the message back out to every connected client (including the sender)
    io.emit("message", messageData);
  });
});

// Sart server
// Usar "0.0.0.0" le dice a Node.js que escuche peticiones de cualquier dispositivo
// que llegue a la dirección IP del servidor.
server.listen(3001,"0.0.0.0", () => {
  console.log("SERVER IS RUNNING");
});
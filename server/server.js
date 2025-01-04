// Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Import dependencies
const express = require("express");
const connectToDb = require("./config/connectToDb.js");
const routes = require("./routes/routes.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// Connect to db
connectToDb();

// Create an express app
const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = new Server(server, {
  cors: {
    origin: true,
    credentials: true,
  },
});

//Configure express app
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

//Routes
app.use(routes);

// Socket.IO connection
let onlineUsers = [];
io.on("connection", (socket) => {
  socket.on("addUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({ userId, socketId: socket.id });

    io.emit("getOnlineUsers", onlineUsers);
  });

  // When a user disconnects
  socket.on("disconnect", () => {
    // Remove the user from onlineUsers array when they disconnect
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

    // Emit the updated list of online users to all clients
    io.emit("getOnlineUsers", onlineUsers);
  });
});

// Start server
server.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

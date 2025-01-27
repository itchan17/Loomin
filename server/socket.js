let onlineUsers = [];

const handleUserConnections = (socket, io) => {
  // Handle user addition (add user to online users list)
  socket.on("addUser", (userId) => {
    if (!onlineUsers.some((user) => user.userId === userId)) {
      onlineUsers.push({ userId, socketId: socket.id });
      console.log(`User added: ${userId}`);
    }
    io.emit("getOnlineUsers", onlineUsers);
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
    console.log(`User disconnected: ${socket.id}`);
  });
};

const handleMessageSending = (socket, io) => {
  // Handle sending message to a user
  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find(
      (user) => user.userId === message.recipientId
    );

    if (user) {
      io.to(user.socketId).emit("getMessage", message);
    }
  });
};

const handleNotificationSending = (socket, io) => {
  // Handle sending notif to a user
  socket.on("sendNotif", (notif) => {
    const user = onlineUsers.find((user) => user.userId === notif.recipientId);

    if (user) {
      io.to(user.socketId).emit("getNotif", notif);
    }
  });
};

// Main connection handler
const handleSocketConnection = (io) => {
  io.on("connection", (socket) => {
    console.log(`A user connected: ${socket.id}`);

    // Call the modularized functions
    handleUserConnections(socket, io);
    handleMessageSending(socket, io);
    handleNotificationSending(socket, io);
  });
};

module.exports = { handleSocketConnection };

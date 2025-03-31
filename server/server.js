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
const { handleSocketConnection } = require("./socket.js");
const path = require("path");

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

// Serve static files from the "public" directory
app.use("/public", express.static(path.join(__dirname, "public")));

//Routes
app.use(routes);

// Socket
handleSocketConnection(io);

// Start server
server.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});

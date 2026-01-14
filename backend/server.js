import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

import app from "./app.js";
import connectdb from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Create HTTP server from express app
const server = http.createServer(app);

// Attach Socket.io to the same server
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  socket.on("join", (userId) => {
    socket.join(userId);
    console.log(`👤 User joined room: ${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

// Start server
server.listen(PORT, async () => {
  await connectdb();
  console.log(`🚀 Server running on port ${PORT}`);
});

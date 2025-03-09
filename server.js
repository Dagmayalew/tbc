const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",  // Allow all origins (Change this in production)
  },
});

let tasks = []; // Store tasks temporarily

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Send current tasks to new connection
  socket.emit("taskList", tasks);

  // Handle new task creation
  socket.on("addTask", (task) => {
    tasks.push(task);
    io.emit("taskList", tasks); // Broadcast update to all clients
  });

  // Handle task deletion
  socket.on("deleteTask", (taskId) => {
    tasks = tasks.filter(task => task.id !== taskId);
    io.emit("taskList", tasks); // Broadcast update to all clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(4000, () => {
  console.log("WebSocket Server running on port 4000");
});

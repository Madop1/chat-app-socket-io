const express = require("express");
const app = express();
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = app.listen(3001, () => {
  console.log("app running at 3001");
});
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected : ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`user connected :${socket.id} and room id :${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`user disconnected , ${socket.id}`);
  });
});

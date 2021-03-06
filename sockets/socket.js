const currentPlayers = [];
const countdownTimer = 5;
const maxPlayers = 4;
const isGameInProgress = false;
const axios = require("axios");

const textAPI = "https://api.quotable.io/random";

const sockets = (io) => {
  io.on("connection", (socket) => {
    console.log("a user connected");
    io.sockets.emit("update-ready-count", currentPlayers.length);

    socket.on("disconnect", () => {
      console.log("user disconnected, removing from playerlist");
      const index = currentPlayers.indexOf(socket.id);
      if (index > -1) currentPlayers.splice(index, 1);
      io.sockets.emit("update-ready-count", currentPlayers.length);
      console.log(currentPlayers);
    });

    socket.on("leave-lobby", () => {
      console.log("user leaving lobby");
    });

    socket.on("ready", () => {
      socket.join("game-lobby");
      if (currentPlayers.length === maxPlayers - 1) {
        console.log("Game will be full after player joins");
        currentPlayers.push(socket.id);
        io.sockets.emit("update-ready-count", currentPlayers.length);
        io.sockets.emit("game-full");
        console.log("Player joined, game is full");
        io.sockets.emit("set-game-countdown", countdownTimer);
      } else {
        console.log("Game is not full! Can ready!");
        currentPlayers.push(socket.id);
        console.log("Socket ID " + socket.id + " is ready");
        console.log(currentPlayers);
        io.sockets.emit("update-ready-count", currentPlayers.length);
      }
    });

    socket.on("unready", () => {
      io.sockets.emit("stop-game-countdown")
      socket.leave("game-lobby");
      currentPlayers.splice(currentPlayers.indexOf(socket.id), 1);
      console.log("Socket ID " + socket.id + " is unready");
      console.log(currentPlayers);
      io.sockets.emit("update-ready-count", currentPlayers.length);
    });

    socket.on("game-start", () => {
      console.log("Game is starting");
      if (socket.rooms.has("game-lobby")) {
        console.log("Socket is in room 'game-lobby'");
        io.to(socket.id).emit("game-init");
      } else {
        console.log("Socket is not in room 'game-lobby'");
      }
    });
  });
};

module.exports = sockets;

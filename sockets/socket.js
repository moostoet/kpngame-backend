const currentPlayers = [];
const countdownTimer = 3;
const maxPlayers = 4;
const axios = require("axios");

const textAPI = "https://api.quotable.io/random";

const sockets = (io) => {
  io.on("connection", (socket) => {
    socket.emit("hello", "Hello world!");
    console.log("a user connected");
    io.sockets.emit("update-ready-count", currentPlayers.length);

    socket.on("disconnect", () => {
      console.log("user disconnected, removing from playerlist");
      currentPlayers.splice(currentPlayers.indexOf(socket.id), 1);
    });

    socket.on("leave-lobby", () => {
      console.log("user leaving lobby");
    });

    socket.on("ready", () => {
      if (currentPlayers.length === maxPlayers - 1) {
        console.log("Game will be full after player joins");
        currentPlayers.push(socket.id);
        io.sockets.emit("update-ready-count", currentPlayers.length);
        io.sockets.emit("game-full");
        console.log("Player joined, game is full")
      } else {
        console.log("Game is not full! Can ready!");
        currentPlayers.push(socket.id);
        console.log("Socket ID " + socket.id + " is ready");
        console.log(currentPlayers);
        io.sockets.emit("update-ready-count", currentPlayers.length);
      }
    });

    socket.on("unready", () => {
      currentPlayers.splice(currentPlayers.indexOf(socket.id), 1);
      console.log("Socket ID " + socket.id + " is unready");
      console.log(currentPlayers);
      io.sockets.emit("update-ready-count", currentPlayers.length);
    });
  });
};

module.exports = sockets;

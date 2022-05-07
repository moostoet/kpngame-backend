require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const socket = require("socket.io");
const path = require("path");

const SocketHandler = require("./sockets/socket");

app.use(cors());

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.send("Welcome to the KPNGame API");
});

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io = socket(server, { cors: { origin: "*" } });
SocketHandler(io);

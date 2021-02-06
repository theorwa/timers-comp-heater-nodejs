const express = require('express')
var bodyParser = require('body-parser')
// const socketIo = require("socket.io");
const http = require("http");

const port = process.env.PORT || 3000
const router = require("./routes");

const app = express();
app.use(router);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const server = http.createServer(app);
// const io = socketIo(server); // < Interesting!

// let interval;

// io.on("connection", (socket) => {
//   console.log("New client connected");
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 1000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//   });
// });

// const getApiAndEmit = socket => {
//   // const response = {timers: router.timers, temp: router.temp};
//   const response = "ORWA123";
//   // Emitting a new message. Will be consumed by the client
//   socket.emit("FromAPI", response);
// };

server.listen(port, () => console.log(`Listening on port ${port}`));
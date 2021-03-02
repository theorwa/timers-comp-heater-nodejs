const express = require('express');
const bodyParser = require('body-parser');
const perf_hooks = require('perf_hooks');
const helmet = require('helmet');
const http = require("http");
require('express-async-errors'); // for exception handler

const requestTime = (req, res, next) => {
    req.requestTime = perf_hooks.performance.now();
    next();
}

const port = process.env.PORT || 3000
const { router } = require("./routes");

const app = express();
app.use(helmet());
app.use(requestTime);
app.use(bodyParser.json({type: "*/*"}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
app.use(async (err, req, res, next) => {
    res.status(500).send({status: "error", cause: err.message})
});

const server = http.createServer(app);

const io = require('socket.io')(server, { cors: {origin: '*',} });

io.sockets.on('connection', (client) => {
  client.on('data', (msg) => {
    console.log('client is subscribing to data: ', msg);
  });
});

const { serversocket } = require("./globals");
serversocket(io);

server.listen(port, () => console.log(`Listening on port ${port}`));
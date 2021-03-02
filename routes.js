const cors = require('cors');
const express = require("express");
const router = express.Router();
const { serversocket, timers, temp } = require("./globals");

router.all('*', cors());

router.get('/data', (req, res) => {
    res.status(200).json({timers, temp})
})

router.post('/data', (req, res) => {
    if (req.body && req.body.timers && req.body.temp)
    { 
        timers = req.body.timers;
        temp = req.body.temp;
        serversocket();
        res.status(200).send("Success");
    }
    else
    {
        serversocket();
        res.status(400).send("Failed");
    }
})

module.exports = {
    router,
};
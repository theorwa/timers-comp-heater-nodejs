const cors = require('cors')
const express = require("express");
const router = express.Router();

router.all('*', cors());

var timers = "compres = 00:00:00,notComp = 00:00:00,heater = 00:00:00,notHeat = 00:00:00";
var temp = "temp 1 max = 00.00 C,temp 1 now = 00.00 C,temp 1 min = 00.00 C,temp 2 max = 00.00 C,temp 2 now = 00.00 C,temp 2 min = 00.00 C";

router.get('/api', (req, res) => {
    res.status(200).json({api: 'version 1'})
})

router.get('/data', (req, res) => {
    res.status(200).json({timers, temp})
})

router.post('/data', (req, res) => {
    if (req.body && req.body.timers && req.body.temp)
    {
        timers = req.body.timers;
        temp = req.body.temp;
        res.send("OK");
    }
    else
    {
        res.send("Failed");
    }
})

module.exports = router;
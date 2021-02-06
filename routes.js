const express = require("express");
const router = express.Router();

var timers = "compres = 00:00:00,notComp = 00:00:00,heater = 00:00:00,notHeat = 00:00:00";
var temp = "temp1 max = 00.00 C,temp1 now = 00.00 C,temp1 min = 00.00 C,temp2 max = 00.00 C,temp2 now = 00.00 C,temp2 min = 00.00 C";

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
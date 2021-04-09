const cors = require('cors');
const express = require("express");
const router = express.Router();
const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const creds = require('./refrigerator-app-sheet-694e986fd28f.json');
const doc = new GoogleSpreadsheet('1KATozL-bJMRbIVW-kIJARpII-HLeGu7xjLtT4W4gdNw');

const accessSpreadsheet = async (temp1, temp2) => {
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();
    const sheet = info.worksheets[0];
    const row = {
        time: Date(),
        temp1: temp1,
        temp2: temp2
    }
    await promisify(sheet.addRow)(row);
}

router.all('*', cors());

var timers = "compres: = 00:00:00,notComp: = 00:00:00,heater : = 00:00:00,notHeat: = 00:00:00";
var temp = "temp 1 max: = 00.00 C,temp 1 now: = 00.00 C,temp 1 min: = 00.00 C,temp 2 max: = 00.00 C,temp 2 now: = 00.00 C,temp 2 min: = 00.00 C";

router.get('/data', (req, res) => {
    res.status(200).json({timers, temp})
})

router.post('/data', (req, res) => {
    if (req.body && req.body.timers && req.body.temp)
    {
        timers = req.body.timers;
        temp = req.body.temp;

        if (temp.indexOf("temp 1 now: = ") !== -1 && temp.indexOf(" C,temp 1 min: = ") !== -1 && temp.indexOf("temp 2 now: = ") !== -1 && temp.indexOf(" C,temp 2 min: = ") !== -1)
        {
            const temp1 = temp.substring(
                temp.indexOf("temp 1 now: = ") + 14, 
                temp.indexOf(" C,temp 1 min: = ")
            );
            const temp2 = temp.substring(
                temp.indexOf("temp 2 now: = ") + 14, 
                temp.indexOf(" C,temp 2 min: = ")
            );
            accessSpreadsheet(temp1, temp2);
        }

        res.status(200).send("Success");
    }
    else
    {
        res.status(400).send("Failed");
    }
})

module.exports = router;
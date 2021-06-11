const cors = require('cors');
const express = require("express");
const router = express.Router();
const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const creds = require('./refrigerator-app-sheet-694e986fd28f.json');
const doc = new GoogleSpreadsheet('1KATozL-bJMRbIVW-kIJARpII-HLeGu7xjLtT4W4gdNw');

var sheets_counter = 0;

const accessSpreadsheet = async (temp1Max, temp1, temp1Min, temp2Max, temp2, temp2Min, compTime, notCompTime, heatTime, notHeatTime) => {
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();
    const sheet = info.worksheets[0];
    const time = new Date();
    const row = {
        time: time.toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' }),
        temp1Max: temp1Max,
        temp1: temp1,
        temp1Min: temp1Min,
        temp2Max: temp2Max,
        temp2: temp2,
        temp2Min: temp2Min,
        compTime: compTime,
        notCompTime: notCompTime,
        heatTime: heatTime,
        notHeatTime: notHeatTime
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

        console.log(timers);
        console.log(temp);

        if (sheets_counter++ > 10)
        {
            sheets_counter = 0;
            if (temp.indexOf("temp 1 max: = ") !== -1 && temp.indexOf(" C,temp 1 now: = ") !== -1 && temp.indexOf("temp 1 now: = ") !== -1 && temp.indexOf(" C,temp 1 min: = ") !== -1
                && temp.indexOf("temp 1 min: = ") !== -1 && temp.indexOf(" C,temp 2 max: = ") !== -1 && temp.indexOf("temp 2 max: = ") !== -1 && temp.indexOf(" C,temp 2 now: = ") !== -1
                && temp.indexOf("temp 2 now: = ") !== -1 && temp.indexOf(" C,temp 2 min: = ") !== -1 && timers.indexOf("compres: =") !== -1 && timers.indexOf(",notComp: =") !== -1
                && timers.indexOf("notComp: =") !== -1 && timers.indexOf(",heater: =") !== -1 && timers.indexOf("heater: =") !== -1 && timers.indexOf(",notHeat: =") !== -1
                && timers.indexOf("notHeat: =") !== -1) 
            {
                const temp1Max = temp.substring(
                    temp.indexOf("temp 1 max: = ") + 14, 
                    temp.indexOf(" C,temp 1 now: = ")
                );
                const temp1 = temp.substring(
                    temp.indexOf("temp 1 now: = ") + 14, 
                    temp.indexOf(" C,temp 1 min: = ")
                );
                const temp1Min = temp.substring(
                    temp.indexOf("temp 1 min: = ") + 14, 
                    temp.indexOf(" C,temp 2 max: = ")
                );
                const temp2Max = temp.substring(
                    temp.indexOf("temp 2 max: = ") + 14, 
                    temp.indexOf(" C,temp 2 now: = ")
                );
                const temp2 = temp.substring(
                    temp.indexOf("temp 2 now: = ") + 11, 
                    temp.indexOf(" C,temp 2 min: = ")
                );
                const temp2Min = temp.substring(
                    temp.indexOf("temp 2 min: = ") + 11, 
                    temp.length - 2
                );
                const compTime = timers.substring(
                    timers.indexOf("compres: =") + 11, 
                    timers.indexOf(",notComp: =")
                );
                const notCompTime = timers.substring(
                    timers.indexOf("notComp: =") + 11, 
                    timers.indexOf(",heater: =")
                );
                const heatTime = timers.substring(
                    timers.indexOf("heater: =") + 11, 
                    timers.indexOf(",notHeat: =")
                );
                const notHeatTime = timers.substring(
                    timers.indexOf("notHeat: =") + 11, 
                    timers.length
                );
                accessSpreadsheet(temp1Max, temp1, temp1Min, temp2Max, temp2, temp2Min, compTime, notCompTime, heatTime, notHeatTime);
                console.log('sent to google sheets')
            } else {
                console.log('failed to send to google sheets')
            }
        }
    res.status(200).send("Success");
    }
    else
    {
        res.status(400).send("Failed");
    }
})

module.exports = router;
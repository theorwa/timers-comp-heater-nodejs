var timers = "compres: = 00:00:00,notComp: = 00:00:00,heater : = 00:00:00,notHeat: = 00:00:00";
var temp = "temp 1 max: = 00.00 C,temp 1 now: = 00.00 C,temp 1 min: = 00.00 C,temp 2 max: = 00.00 C,temp 2 now: = 00.00 C,temp 2 min: = 00.00 C";

const setTimers = (t) => timers = t;
const setTemp = (t) => temp = t;

const serversocket = (io) => {
    if (io) globalio = io;
    if (globalio && globalio.sockets)
    {
        globalio.sockets.emit('data', {timers, temp});
        console.log("server socket sends data to clients");
    }
}

const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const creds = require('./refrigerator-app-sheet-694e986fd28f.json');
const doc = new GoogleSpreadsheet('1KATozL-bJMRbIVW-kIJARpII-HLeGu7xjLtT4W4gdNw');
async const accessSpreadsheet = () => {
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();
    console.log(info.worksheets[0]);    
}
accessSpreadsheet();


module.exports = {
    serversocket,
    timers,
    temp,
    setTimers,
    setTemp,
};
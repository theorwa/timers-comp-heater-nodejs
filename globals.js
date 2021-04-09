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


module.exports = {
    serversocket,
    timers,
    temp,
    setTimers,
    setTemp,
};
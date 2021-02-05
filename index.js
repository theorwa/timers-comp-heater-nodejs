const cors = require('cors')
const express = require('express')
var bodyParser = require('body-parser')
const app = express()
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.PORT || 3000

var timers = "compres = 00:00:00,notComp = 00:00:00,heater = 00:00:00,notHeat = 00:00:00";
var temp = "temp1 = 00.00 C,temp2 = 00.00 C";

app.get('/api', (req, res) => {
  res.status(200).json({api: 'version 1'})
})

app.get('/data', (req, res) => {
  res.status(200).json({timers, temp})
})

app.post('/data', (req, res) => {
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

app.listen(port, () => console.log('server started'))
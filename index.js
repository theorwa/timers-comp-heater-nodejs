const cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())

const port = process.env.PORT || 3000

var timers = "comp = 00:00:00,notComp = 00:00:00,heat = 00:00:00,notHeat = 00:00:00";
var temp = "temp1 = 00.00 C,temp2 = 00.00 C";

app.get('/api', (req, res) => {
  res.status(200).json({api: 'version 1'})
})

app.get('/data', (req, res) => {
  res.status(200).json({timers, temp})
})

app.listen(port, () => console.log('server started'))
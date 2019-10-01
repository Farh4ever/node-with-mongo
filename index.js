const express = require('express')
const userRouter = require('./router/userRoutes')
require('dotenv').config();
var device = require('express-device');
const port = process.env.PORT
require('./db/db')

const app = express()

app.use(device.capture());
app.use(express.json())
app.use(userRouter)

app.use('/', (req, res) => res.send("Welcome to Farhan's Node Server! " +req.device.type.toUpperCase()));
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
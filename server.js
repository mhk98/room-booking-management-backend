const express = require('express');
const bodyParser = require('body-parser');
const dbConnect = require('./config/database.config');
const UserRoute = require('./routes/user')
const RoomsRoute = require('./routes/room')
const BookingsRoute = require('./routes/booking')
const app = express();
const cors = require("cors");
require('dotenv').config();
const path = require('path');

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


dbConnect()
app.use('/api/v1/user',UserRoute)
app.use('/api/v1/room',RoomsRoute)
app.use('/api/v1/booking',BookingsRoute)


// Static image folder
app.use("/images", express.static("images"));

app.get('/', (req, res) => {
    res.json({"message": "Hello server is running"});
});

app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});





const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// const userRoutes = require('./routes/User.js');

app.use(cors());
app.use(bodyParser.json({ limit: "24mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "24mb", extended: true }));

// app.use('/user', userRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT);
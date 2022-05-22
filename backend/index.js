const express = require('express');

const app = express();

const tripRoutes = require('./routes/tripRoutes');
const cityRoutes = require('./routes/cityRoutes');
const ferryRouteRoutes = require('./routes/ferryRouteRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/trips', tripRoutes)
app.use('/cities', cityRoutes)
app.use('/ferryRoutes', ferryRouteRoutes)

app.listen(3000);
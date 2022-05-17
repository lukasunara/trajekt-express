const express = require('express');

const app = express();

//const scheduleRoutes = require('./routes/scheduleRoutes');
//const ferryRoutes = require('./routes/ferryRoutes');
//const countryRoutes = require('./routes/countryRoutes');
const tripRoutes = require('./routes/tripRoutes');
//const cityRoutes = require('./routes/cityRoutes');
//const registeredUserRoutes = require('./routes/registeredUserRoutes');
//const travelCompanyRoutes = require('./routes/travelCompanyRoutes');
//const travelerRoutes = require('./routes/travelerRoutes');
const ferryRouteRoutes = require('./routes/ferryRouteRoutes');
//const ticketRoutes = require('./routes/ticketRoutes');
//const tripRouteRoutes = require('./routes/tripRouteRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use('/schedules', scheduleRoutes)
//app.use('/ferries', ferryRoutes)
//app.use('/countries', countryRoutes)
app.use('/trips', tripRoutes)
//app.use('/cities', cityRoutes)
//app.use('/registeredUsers', registeredUserRoutes)
//app.use('/travelCompanies', travelCompanyRoutes)
//app.use('/travelers', travelerRoutes)
app.use('/ferryRoutes', ferryRouteRoutes)
//app.use('/ticekts', ticketRoutes)
//app.use('/tripRoutes', tripRouteRoutes)

app.listen(3000);
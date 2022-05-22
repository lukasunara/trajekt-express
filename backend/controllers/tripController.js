const { Pool } = require('pg');
const City = require('../models/City')
const Trip = require('../models/Trip')
const Trips = require('../models/Trips')
const Ferry = require('../models/Ferry')
const Country = require('../models/Country')
const Schedule = require('../models/Schedule')
const FerryRoute = require('../models/FerryRoute')
const TravelCompany = require('../models/TravelCompany')
const scheduleController = require('../controllers/scheduleController')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'TrajektExpress',
    password: 'bazepodataka',
    port: 5432,
});

module.exports = {
    getAllTrips: () => {
        return pool.query(
            `SELECT trip.tripId, trip.price, schedule.scheduleId, schedule.departureTime, schedule.arrivalTime,
                ferryRoute.departurePostalNumber, ferryRoute.destinationPostalNumber, ferryRoute.routeId,
                ferry.ferryId, ferry.name AS ferryName, ferry.capacity, ferry.canTransportVehicles,
                travelCompany.travelCompanyId, travelCompany.name AS travelCompanyName, travelCompany.CID,
                c1.name AS destinationCityName, cn1.countryCode AS destinationCountryCode, cn1.name AS destinationCountryName,
                c2.name AS departureCityName, cn2.countryCode AS departureCountryCode, cn2.name AS departureCountryName
            FROM trip NATURAL JOIN schedule NATURAL JOIN ferryRoute NATURAL JOIN
                tripRoute NATURAL JOIN ferry
				JOIN travelCompany ON travelCompany.travelCompanyId = ferryRoute.travelCompanyId
                JOIN city AS c1 ON c1.postalNumber = ferryRoute.destinationPostalNumber
                JOIN city AS c2 ON c2.postalNumber = ferryRoute.departurePostalNumber
                JOIN country AS cn1 ON cn1.countryCode = c1.countryCode
                JOIN country AS cn2 ON cn2.countryCode = c2.countryCode
			ORDER BY trip.tripId;`
        ).then((res) => {
            let array = []
            res.rows.forEach((row) => {
                let departureCountry = new Country(row.departurecountrycode, row.departurecountryname)
                let destinationCountry = new Country(row.destinationcountrycode, row.destinationcountryname)
                let departureCity = new City(row.departurepostalnumber, row.departurecityname, departureCountry)
                let destinationCity = new City(row.destinationpostalnumber, row.destinationcityname, destinationCountry)
                let travelCompany = new TravelCompany(row.travelcompanyid, row.cid, row.travelcompanyname)
                let ferry = new Ferry(row.ferryid, row.ferryname, row.capacity, row.cantransportvehicles)
                let ferryRoute = new FerryRoute(row.routeid, departureCity, destinationCity, travelCompany, ferry)
                let schedule = new Schedule(row.scheduleid, row.departuretime, row.arrivaltime)

                array.push(new Trip(row.tripid, row.price, schedule, ferryRoute))
            })
            return Trips(array)
        })
    },

    getTripsByCities: (departureCity, destinationCity) => {
        return pool.query(
            `SELECT trip.tripId, trip.price, schedule.scheduleId, schedule.departureTime, schedule.arrivalTime,
                ferryRoute.departurePostalNumber, ferryRoute.destinationPostalNumber, ferryRoute.routeId,
                ferry.ferryId, ferry.name AS ferryName, ferry.capacity, ferry.canTransportVehicles,
                travelCompany.travelCompanyId, travelCompany.name AS travelCompanyName, travelCompany.CID,
                c1.name AS destinationCityName, cn1.countryCode AS destinationCountryCode, cn1.name AS destinationCountryName,
                c2.name AS departureCityName, cn2.countryCode AS departureCountryCode, cn2.name AS departureCountryName
            FROM trip NATURAL JOIN schedule NATURAL JOIN ferryRoute NATURAL JOIN
                tripRoute NATURAL JOIN ferry
				JOIN travelCompany ON travelCompany.travelCompanyId = ferryRoute.travelCompanyId
                JOIN city AS c1 ON c1.postalNumber = ferryRoute.destinationPostalNumber
                JOIN city AS c2 ON c2.postalNumber = ferryRoute.departurePostalNumber
                JOIN country AS cn1 ON cn1.countryCode = c1.countryCode
                JOIN country AS cn2 ON cn2.countryCode = c2.countryCode
            WHERE c2.name = '$2' AND c1.name = '$1'
			ORDER BY trip.tripId;`,
            [departureCity, destinationCity]
        ).then((res) => {
            let array = []
            res.rows.forEach((row) => {
                let departureCountry = new Country(row.departurecountrycode, row.departurecountryname)
                let destinationCountry = new Country(row.destinationcountrycode, row.destinationcountryname)
                let departureCity = new City(row.departurepostalnumber, row.departurecityname, departureCountry)
                let destinationCity = new City(row.destinationpostalnumber, row.destinationcityname, destinationCountry)
                let travelCompany = new TravelCompany(row.travelcompanyid, row.cid, row.travelcompanyname)
                let ferry = new Ferry(row.ferryid, row.ferryname, row.capacity, row.cantransportvehicles)
                let ferryRoute = new FerryRoute(row.routeid, departureCity, destinationCity, travelCompany, ferry)
                let schedule = new Schedule(row.scheduleid, row.departuretime, row.arrivaltime)

                array.push(new Trip(row.tripid, row.price, schedule, ferryRoute))
            })
            return array
        })
    },

    getTripsByDepartureDate: (departureDate) => {
        return pool.query(
            `SELECT trip.tripId, trip.price, schedule.scheduleId, schedule.departureTime, schedule.arrivalTime,
                ferryRoute.departurePostalNumber, ferryRoute.destinationPostalNumber, ferryRoute.routeId,
                ferry.ferryId, ferry.name AS ferryName, ferry.capacity, ferry.canTransportVehicles,
                travelCompany.travelCompanyId, travelCompany.name AS travelCompanyName, travelCompany.CID,
                c1.name AS destinationCityName, cn1.countryCode AS destinationCountryCode, cn1.name AS destinationCountryName,
                c2.name AS departureCityName, cn2.countryCode AS departureCountryCode, cn2.name AS departureCountryName
            FROM trip NATURAL JOIN schedule NATURAL JOIN ferryRoute NATURAL JOIN
                tripRoute NATURAL JOIN ferry
				JOIN travelCompany ON travelCompany.travelCompanyId = ferryRoute.travelCompanyId
                JOIN city AS c1 ON c1.postalNumber = ferryRoute.destinationPostalNumber
                JOIN city AS c2 ON c2.postalNumber = ferryRoute.departurePostalNumber
                JOIN country AS cn1 ON cn1.countryCode = c1.countryCode
                JOIN country AS cn2 ON cn2.countryCode = c2.countryCode
            WHERE schedule.departureTime::DATE = '$1'
			ORDER BY trip.tripId;`,
            [departureDate]
        ).then((res) => {
            let array = []
            res.rows.forEach((row) => {
                let departureCountry = new Country(row.departurecountrycode, row.departurecountryname)
                let destinationCountry = new Country(row.destinationcountrycode, row.destinationcountryname)
                let departureCity = new City(row.departurepostalnumber, row.departurecityname, departureCountry)
                let destinationCity = new City(row.destinationpostalnumber, row.destinationcityname, destinationCountry)
                let travelCompany = new TravelCompany(row.travelcompanyid, row.cid, row.travelcompanyname)
                let ferry = new Ferry(row.ferryid, row.ferryname, row.capacity, row.cantransportvehicles)
                let ferryRoute = new FerryRoute(row.routeid, departureCity, destinationCity, travelCompany, ferry)
                let schedule = new Schedule(row.scheduleid, row.departuretime, row.arrivaltime)

                array.push(new Trip(row.tripid, row.price, schedule, ferryRoute))
            })
            return array
        })
    },

    createTrip: (price, departureTime, arrivalTime) => {
        let schedule = scheduleController.getScheduleByTimes(departureTime, arrivalTime)
        if (!schedule)
            schedule = scheduleController.createSchedule(departureTime, arrivalTime)
        return pool.query(
            'INSERT INTO trip (price, scheduleId) values ($1, $2);', [price, schedule.scheduleId]
        ).then((res) => {
            res.rows[0]
        })
    },

    updateTrip: (tripId, updatedDepartureTime, updatedArrivalTime) => {
        let schedule = scheduleController.getScheduleByTimes(updatedDepartureTime, updatedArrivalTime)
        if (!schedule)
            schedule = scheduleController.createSchedule(updatedDepartureTime, updatedArrivalTime)
        return pool.query(
            'UPDATE trip SET scheduleId = $1 WHERE tripId = $2);', [schedule.scheduleId, tripId]
        ).then((res) => {
            res.rows[0]
        })
    },

    deleteTrip: (tripId) => {
        return pool.query('DELETE FROM trip WHERE tripId = $1;', [tripId])
    }
}

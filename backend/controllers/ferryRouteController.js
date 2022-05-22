const { Pool } = require('pg');
const FerryRoute = require('../models/FerryRoute')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'TrajektExpress',
    password: 'bazepodataka',
    port: 5432,
});

module.exports = {
    getAll: () => {
        return pool.query(
            `SELECT ferryRoute.departurePostalNumber, ferryRoute.destinationPostalNumber, ferryRoute.routeId,
                ferry.ferryId, ferry.name AS ferryName, ferry.capacity, ferry.canTransportVehicles,
                travelCompany.travelCompanyId, travelCompany.name AS travelCompanyName, travelCompany.CID,
                c1.name AS destinationCityName, cn1.countryCode AS destinationCountryCode, cn1.name AS destinationCountryName,
                c2.name AS departureCityName, cn2.countryCode AS departureCountryCode, cn2.name AS departureCountryName
            FROM ferryRoute NATURAL JOIN ferry
                JOIN travelCompany ON travelCompany.travelCompanyId = ferryRoute.travelCompanyId
                JOIN city AS c1 ON c1.postalNumber = ferryRoute.destinationPostalNumber
                JOIN city AS c2 ON c2.postalNumber = ferryRoute.departurePostalNumber
                JOIN country AS cn1 ON cn1.countryCode = c1.countryCode
                JOIN country AS cn2 ON cn2.countryCode = c2.countryCode
			ORDER BY ferryRoute.routeId;`
        ).then((res) => {
            let array = []
            res.rows.forEach((row) => {
                let departureCountry = new Country(row.departurecountrycode, row.departurecountryname)
                let destinationCountry = new Country(row.destinationcountrycode, row.destinationcountryname)
                let departureCity = new City(row.departurepostalnumber, row.departurecityname, departureCountry)
                let destinationCity = new City(row.destinationpostalnumber, row.destinationcityname, destinationCountry)
                let travelCompany = new TravelCompany(row.travelcompanyid, row.cid, row.travelcompanyname)
                let ferry = new Ferry(row.ferryid, row.ferryname, row.capacity, row.cantransportvehicles)

                array.push(new FerryRoute(row.routeid, departureCity, destinationCity, travelCompany, ferry))
            })
            return array
        })
    }
}

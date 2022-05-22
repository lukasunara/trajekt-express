const { Pool } = require('pg');
const City = require('../models/City')
const Country = require('../models/Country')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'TrajektExpress',
    password: 'bazepodataka',
    port: 5432,
});

module.exports = {
    getAllCities: () => {
        return pool.query(
            `SELECT city.postalNumber, city.name AS cityName, country.countryCode, country.name AS countryName
                FROM city JOIN country USING (countryCode);`
        ).then((res) => {
            let array = []
            res.rows.forEach((row) => {
                let country = new Country(row.countrycode, row.countryname)
                array.push(new City(row.postalnumber, row.cityname, country))
            })
            return array
        })
    }
}

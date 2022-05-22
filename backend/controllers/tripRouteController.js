const { Pool } = require('pg');
const TripRoute = require('../models/TripRoute')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'TrajektExpress',
    password: 'bazepodataka',
    port: 5432,
});

module.exports = {
    createTripRoute: (tripId, routeId) => {
        return pool.query(
            'INSERT INTO tripRoute (tripId, routeId) VALUES ($1, $2);', [tripId, routeId]
        ).then((res) => {
            let row = res.rows[0]
            new TripRoute(row.tripId, row.routeId)
        })
    }
}

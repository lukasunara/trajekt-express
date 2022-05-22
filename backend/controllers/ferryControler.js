const { Pool } = require('pg');
const Ferry = require('../models/Ferry')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'TrajektExpress',
    password: 'bazepodataka',
    port: 5432,
});

module.exports = {
    getFerryById: (ferryId) => {
        return pool.query(
            `SELECT ferryId, name, capacity, canTransportVehicles FROM ferry WHERE ferryId = $1`, [ferryId]
        ).then((res) => {
            if (res.rowCount > 0) {
                let row = res.rows[0]
                return new Ferry(row.ferryid, row.name, row.capacity, row.cantransporthvehicles)
            } else {
                return null
            }
        })
    }
}

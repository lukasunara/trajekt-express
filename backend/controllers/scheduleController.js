const { Pool } = require('pg');
const Schedule = require('../models/Schedule')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'TrajektExpress',
    password: 'bazepodataka',
    port: 5432,
});

module.exports = {
    getScheduleById: (scheduleId) => {
        return pool.query(
            `SELECT scheduleId, departureTime, arrivalTime FROM schedule WHERE scheduleId = $1`, [scheduleId]
        ).then((res) => {
            if (res.rowCount > 0) {
                let row = res.rows[0]
                return new Schedule(row.scheduleid, row.departuretime, row.arrivaltime)
            } else {
                return null
            }
        })
    },

    getScheduleByTimes: (departureTime, arrivalTime) => {
        return pool.query(
            `SELECT scheduleId, departureTime, arrivalTime
                FROM schedule
                WHERE departureTime = $1 AND arrivalTime = $2`,
            [departureTime, arrivalTime]
        ).then((res) => {
            if (res.rowCount > 0) {
                let row = res.rows[0]
                return new Schedule(row.scheduleid, row.departuretime, row.arrivaltime)
            } else {
                return null
            }
        })
    },

    createSchedule: (departureTime, arrivalTime) => {
        return pool.query(
            'INSERT INTO schedule (departureTime, arrivalTime) values ($1, $2)', [departureTime, arrivalTime]
        ).then((res) => {
            let row = res.rows[0]
            new Schedule(row.scheduleid, row.departuretime, row.arrivaltime)
        })
    }
}

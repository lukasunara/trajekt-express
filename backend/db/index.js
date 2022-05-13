const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'TrajektExpress',
    password: 'bazepodataka',
    port: 5432,
});

module.exports = {
    query: async (text, params) => {
        return await pool.query(text, params);
    },
    pool: pool
};
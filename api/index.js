const sql = require("mssql");

module.exports = async function (context, req) {
    try {
        const config = {
            user: process.env.SQL_USER,
            password: process.env.SQL_PASSWORD,
            server: process.env.SQL_SERVER,
            database: process.env.SQL_DATABASE,
            options: { encrypt: true }
        };

        const pool = await sql.connect(config);

        const result = await pool.request().query(`
            SELECT Country, COUNT(*) AS StudentCount
            FROM Students
            GROUP BY Country
        `);

        context.res = {
            status: 200,
            body: result.recordset
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: err.message
        };
    }
};

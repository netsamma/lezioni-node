// const mysql = require('mysql');
const mysql = require('mysql2/promise');

// mysql connector
const mysqlConnector = mysql.createConnection({
    // host: process.env.DB_HOST,
    host: 'localhost',
    // port: process.env.DB_PORT,
    port: 3306,
    // user: process.env.DB_USERNAME,
    user: 'root',
    // password: process.env.DB_PASSWORD,
    password: 'root',
    // database: process.env.DB_DATABASE,
    database: 'ecommerce',
    ssl: {
        rejectUnauthorized: false,
    },
});

mysqlConnector.query("SELECT 1")
    .then(()=> console.log('db connection succeeded'))
    .catch(()=> console.log('db connection failed'))

module.exports = mysqlConnector
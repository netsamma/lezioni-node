// const mysql = require('mysql');

//const mysql = require('mysql2/promise');
import mysql from "mysql2/promise";

// mysql connector
const mysqlConnector = await mysql.createConnection({
    // host: process.env.DB_HOST,
    host: '127.0.0.1',
    // port: process.env.DB_PORT,
    port: 3306,
    // user: process.env.DB_USERNAME,
    user: 'root',
    // password: process.env.DB_PASSWORD,
    password: 'password',
    // database: process.env.DB_DATABASE,
    database: 'express_ecommerce',

});

mysqlConnector.query("SELECT 1")
    .then(()=> console.log('db connection succeeded'))
    .catch(()=> console.log('db connection failed'))

//module.exports = mysqlConnector
export default mysqlConnector;

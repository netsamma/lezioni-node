
//**********************************************************************
// Esercitazione 5 - Server Node con connessione mysql db
//**********************************************************************

const http = require('http');
const mysql = require('mysql');
// mysql connector
module.exports = mysql.createConnection({
    
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



const products = [
  { id: 1, name: 'Prodotto 1', price: 10.99 },
  { id: 2, name: 'Prodotto 2', price: 20.49 },
  { id: 3, name: 'Prodotto 3', price: 15.99 }
];

const PORT = 8080
const HOST = 'http://localhost'

const server = http.createServer(function (req, res) {
	  res.setHeader('Content-Type', 'application/json');
  	  res.end(JSON.stringify(products,null,2));
	}).listen(8080,() =>
	  console.log(`Server Running on ${HOST}:${PORT}`)
);
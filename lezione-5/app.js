//******************************************************************************
// Esercitazione 5 - Server Node con connessione mysql db, controller e services
//******************************************************************************

const express = require('express');
const productsController = require('./controllers/products.controller');

const app = express();

const HOST = 'http://localhost'
const PORT = 8080

app.listen(PORT, 
	()=> console.log(`Server started at ${HOST}:${PORT}`)
)

// Utilizzo del controller dei prodotti
app.use('/products', productsController);








//**********************************************************************
// Esercitazione VECCHIA - Server Node con accesso al DB Mysql
//**********************************************************************

// // File db.js

// const mysql = require('mysql2');
// // Installare mysql2

// // Configurazione per la connessione al database MySQL
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'ecommerce'
// });

// // Funzione per ottenere i prodotti dal database
// function getAllProducts(callback) {
//   connection.query('SELECT * FROM products', function(err, results) {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, results);
//     }
//   });
// }

// module.exports = {
//   getAllProducts
// };

// // File app.js

// const http = require('http');
// const { getAllProducts } = require('./database'); 

// const PORT = 8080;
// const HOST = 'http://localhost';

// const server = http.createServer(function (req, res) {
//   res.setHeader('Content-Type', 'application/json');
  
//   // Ottieni i prodotti dal database
//   getAllProducts(function(err, products) {
//     if (err) {
//       res.statusCode = 500;
//       res.end(JSON.stringify({ error: 'Internal Server Error' }));
//     } else {
//       res.end(JSON.stringify(products, null, 2));
//     }
//   });
// }).listen(PORT, () =>
//   console.log(`Server Running on ${HOST}:${PORT}`)
// );
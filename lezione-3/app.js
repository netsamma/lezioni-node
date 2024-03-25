//**********************************************************************
// Esercitazione 1 - Server Node Semplice
//**********************************************************************

// const http = require('http');
// const PORT = 8080
// const HOST = 'http://localhost'
// //Crea l'oggetto server
// http.createServer(function (req, res) {
//   //Scrive una risposta per il client
//   res.write('Hello World!'); 
//   //Termina la risposta
//   res.end();
// 	//il server ascolta sulla porta 8080; 
// }).listen(8080,() =>
//    console.log(`Server Running on ${HOST} port: ${PORT}`)
// ); 



//**********************************************************************
// Esercitazione 2 - Server Node che ritorna contenuto HTML
//**********************************************************************

// const http = require('http')
// http.createServer(function (req, res) {
//     console.log(req);
//     res.writeHead(200, {'Content-Type': 'text/html'} )
//     res.end("<h1>Ciao dal server</h1>")
// }).listen(80, () => {
//     console.log('Server running on http://localhost:80');
// })


//**********************************************************************
// Esercitazione 3 - Server Node con response in oggetti JSON
//**********************************************************************

// const http = require('http');

// const products = [
//   { id: 1, name: 'Prodotto 1', price: 10.99 },
//   { id: 2, name: 'Prodotto 2', price: 20.49 },
//   { id: 3, name: 'Prodotto 3', price: 15.99 }
// ];

// const PORT = 8080
// const HOST = 'http://localhost'

// const server = http.createServer(function (req, res) {
// 	  res.setHeader('Content-Type', 'application/json');
//   	  res.end(JSON.stringify(products,null,2));
// 	}).listen(8080,() =>
// 	  console.log(`Server Running on ${HOST}:${PORT}`)
// );




//**********************************************************************
// Esercitazione 4 - Server Node con accesso al DB Mysql
//**********************************************************************


// File db.js

const mysql = require('mysql2');
// Installare mysql2

// Configurazione per la connessione al database MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'ecommerce'
});

// Funzione per ottenere i prodotti dal database
function getAllProducts(callback) {
  connection.query('SELECT * FROM products', function(err, results) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
}

module.exports = {
  getAllProducts
};



// File app.js

const http = require('http');
const { getAllProducts } = require('./database'); 

const PORT = 8080;
const HOST = 'http://localhost';

const server = http.createServer(function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  
  // Ottieni i prodotti dal database
  getAllProducts(function(err, products) {
    if (err) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Internal Server Error' }));
    } else {
      res.end(JSON.stringify(products, null, 2));
    }
  });
}).listen(PORT, () =>
  console.log(`Server Running on ${HOST}:${PORT}`)
);
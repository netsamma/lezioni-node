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
// Routing senza Express JS
//**********************************************************************

// const http = require('http')
// http.createServer(function(req, res){
//   // Homepage
//   if (req.url == "/"){
//     res.writeHead(200, {"Content-type": "text/html"})
//     res.end("Welcome to homepage!")
//   // About page  
//   }else if (req.url == "/about"){
//     res.writeHead(200, {"Content-type": "text/html"})
//     res.end("Welcome to the about page!")
//   }else{
//     res.writeHead(200, {"Content-type": "text/plain"})
//     res.end("404 error! File not found")
//   }
// }).listen(8080, function(){
//   console.log("Server runnig on 8080");
// })




//**********************************************************************
// Routing con Express JS
//**********************************************************************

// const express = require('express');
// const app = express();

// // Definizione delle rotte
// app.get('/', (req, res) => {
//   res.send('Homepage');
// });

// app.get('/about', (req, res) => {
//   res.send('About Page');
// });

// // Gestione di tutte le altre richieste
// app.use((req, res) => {
//   res.status(404).send('404 Not Found');
// });

// // Avvio del server
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}/`);
// });






//**********************************************************************
// Operazioni dipendenti una dall'altra con Promise
//**********************************************************************

// const promiseQuery = (conn, query, params) => {
//   return new Promise((resolve, reject) => {
//     conn.query(query, params, function (err, res) {
//       if (err) return reject(err);
//       return resolve(res);
//     });
//   });
// }

// app.post('/addArmy/:game_id', (req, res) => {
//   const body = req.body;
//   promiseQuery(conn, `Update country SET army= army + ? WHERE game_id=? AND name=?`,
//       [req.body.countryArmy, req.params.game_id, req.body.countryName]).then(
//           r1 =>
//               promiseQuery(conn,
//                   'Select * FROM country WHERE game_id=? AND name=?',
//                   [req.params.game_id, req.body.countryName]).then(r2 => res.json(r2[0]))

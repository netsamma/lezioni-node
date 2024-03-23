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

const http = require('http');

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
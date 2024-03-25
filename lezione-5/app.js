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
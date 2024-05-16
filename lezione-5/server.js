//******************************************************************************
// Esercitazione 5 - Server Node con connessione mysql db, controller e services
//******************************************************************************

//const express = require('express');
import express from "express";

//const productsController = require('./controller/products.controller');
import productsController from "./controller/products.controller.js";

const app = express();

const HOST = 'http://localhost'
const PORT = 8080

app.listen(PORT, 
	()=> console.log(`Server started at ${HOST}:${PORT}`)
)

// Utilizzo del controller dei prodotti
app.use('/products', productsController);
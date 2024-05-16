//const express = require('express')
import express from "express";

const router = express.Router()

//const service = require('../services/products.service')
import service from "../services/products.service.js";

router.get('/', async (req, res) => {
	const products = await service.getAllProducts()
	// res.send('Lista dei prodotti')
	res.send(products)
})

router.get('/by_id/:id', async (req, res) => {
	const product = await service.getProductById(req.params.id)
	// res.send('Prodotto con id: '+id)
	res.send(product)
})

//module.exports = router
export default router

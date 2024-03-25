const express = require('express')
const router = express.Router()

const service = require('../services/products.service')

router.get('/', async (req, res) => {
	const products = await service.getAllProducts()
	// res.send('Lista dei prodotti')
	res.send(products)
})

router.get('/:id', async (req, res) => {
	const product = await service.getProductById(2)
	// res.send('Prodotto con id: '+id)
	res.send(product)
})

module.exports = router
const db = require('../db')

const getAllProducts = async () => {
	const [records] = await db.query("SELECT * FROM products") 
	return records
}

const getProductById = async (id) => {
	const record = await db.query("SELECT * FROM products WHERE ?",[id]) 
	return record
}

module.exports = {getAllProducts, getProductById}
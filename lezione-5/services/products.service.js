//const db = require('../db')
import db from "../db.js";

const getAllProducts = async () => {
	const [records] = await db.query("SELECT * FROM products") 
	return records
}

const getProductById = async (id) => {
	const [records] = await db.query("SELECT * FROM products WHERE id=?",[id]) 
	return records[0]
}

//module.exports = {getAllProducts, getProductById}
export default {getAllProducts, getProductById}

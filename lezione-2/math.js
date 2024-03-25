// ******************************************
// Moduli in Node 
// ******************************************

// Esportazione di più funzioni all'interno di un modulo Node.js 

function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}
  
function divide(a, b) {
	if (b === 0) {
	  throw new Error("Division by zero");
	}
	return a / b;
}

function calcolaAreaQuadrato(lato){
    return lato * lato
}

function calcolaPerimetroQuadrato(lato){
    return lato*4
}

function calcolaDiagonaleQuadrato(lato) {
    return Math.sqrt(2*lato*lato)
}

// Require JS - Esportiamo SOLO ALCUNE funzioni
module.exports = { add, subtract, multiply, divide };

// oppure 

// ES6 module - "type":"module" in package.json
// export {add, subtract}
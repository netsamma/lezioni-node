// ******************************************
// Moduli in Node 
// ******************************************

// Importa le funzioni utilizzando il destructuring
const { add, subtract, multiply, divide } = require('./math');

// Utilizza le funzioni importate
console.log(add(5, 3));       // Output: 8
console.log(subtract(7, 2));  // Output: 5
console.log(multiply(4, 6));   // Output: 24
console.log(divide(10, 2));    // Output: 5
try {
	console.log(divide(10, 0));    // Output: 5
} catch (error) {
	console.log("non va");
}
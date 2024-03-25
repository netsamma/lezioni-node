// ******************************************
//  Moduli in Node 
// ******************************************

// Esercitazione 1 - Moduli Require JS e Es6

// Require.js - (utilizzando il destructuring)
const { add, subtract, multiply, divide } = require('./math');

// ES6 - aggiungere "type":"module" in package.json
// import { add, subtract } from './math';

// Utilizza le funzioni importate
console.log(add(5, 3));       // Output: 8
console.log(subtract(7, 2));  // Output: 5
console.log(multiply(4, 6));   // Output: 24
console.log(divide(10, 2));    // Output: 5

// console.log(divide(10, 0));    // Output: undefined

try {
    console.log(divide(10, 0));
} catch (error) {
    console.error(error.message); // Output: Division by zero
}


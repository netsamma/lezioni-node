// ******************************************
//  Moduli in Node 
// ******************************************

// Esercitazione 1 - Moduli Require JS e Es6

// Require.js - (utilizzando il destructuring)
// const { add, subtract, multiply, divide } = require('./math');

// ES6 - aggiungere "type":"module" in package.json
// import { add, subtract } from './math';

// Require.js - Più moduli contemporaneamente
// require(['mod1', 'mod2'], function(mod1, mod2){
//     mod1.hello();
//     mod2.goodbye();
// });


// Require.js - Più moduli contemporaneamente con Promise.all
Promise.all([
    require('./mod1'),
    require('./mod2')
 ]).then(([mod1, mod2]) => {
    console.log(mod1());
    console.log(mod2());
 }).catch(err => {
    console.error('Errore caricamento moduli:', err);
 });
 

// // Utilizza le funzioni importate
// console.log(add(5, 3));       // Output: 8
// console.log(subtract(7, 2));  // Output: 5
// console.log(multiply(4, 6));   // Output: 24
// console.log(divide(10, 2));    // Output: 5

// console.log(divide(10, 0));    // Output: undefined

// try {
//     console.log(divide(10, 0));
// } catch (error) {
//     console.error(error.message); // Output: Division by zero
// }


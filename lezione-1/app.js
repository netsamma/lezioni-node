// ************************************************
// Programmazione asincrona
// ************************************************



// setTimeout ( () => {
//     console.log('Ciao');
// }, 2000);



// setTimeout(saluta, 3000)
// function saluta(){
//     console.log("Ciao");
// }



// setTimeout(()=>{
//     console.log("Ciao");
//     setTimeout(()=>{
//         console.log("Ciao 2")}, 
//     3000)
// }, 2000);


setTimeout ( () => {
    console.log('Ciao dalla callback' );
}, 4000);
console.log('Ciao da fuori la CB' );

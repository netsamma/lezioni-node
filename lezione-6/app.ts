// ******************************************************
//  Lezioni Typescript
// ******************************************************

var x = 20;
function quadrato(n: number) {
  return n*n;
}
var y = quadrato(x);
// console.log(y);


function add(num1: number, num2: number){
  return num1 + num2
}
// console.log("Funzione Add: "+ add(2, 3));


const rect = { width: 10, height: 15 };
const area = rect.width * rect.height;
// console.log("Area: " + area)


function calculateCircleArea(radius: number): number {
   return Math.PI * radius * radius;
}
// console.log(calculateCircleArea(3.13))


function ringrazia(nome: String, eta: Number, citta: String) {
    return "Grazie da "+ nome + " da "+citta
}
// console.log(ringrazia("Matteo",25,"Firenze"));


type Person = {
   nome: String,
   eta: Number,
   citta: String
}

function ringrazia2(person: Person) {
    return "Grazie da "+ person.nome + " da "+ person.citta
}
// console.log(ringrazia2({nome:"Matteo", eta:25, citta:"Firenze"}))


let numeri: Number[];
numeri = [23, 34, 56]
// console.log(numeri)


let numeri2: Array<Number>;
numeri2 = [12, 54, 98]
// console.log(numeri2)


// Tuple

let articolo: [String, String, Number];
articolo = ["Giacca", "L", 52]
//console.log(articolo)

let articolo2: [string, string | number] = ["Giacca", 54];
//console.log(articolo2)

// Enum
enum Frutta {Mela, Arancia, Pera, Banana};
let frutti: Frutta[] = [];
frutti.push(Frutta.Arancia)

// console.log(Frutta.Arancia)
// console.log(Frutta[0])
// console.log(frutti)


// Interfacce
interface Messaggio {
    email: string,
    message: string,
    date?: string
}

function inviaMessaggio(msg: Messaggio){
    if(msg.email !== "")
        return "ok"
    else if (msg.date !== ""){
        return "ko"
    }else{
        return "Nessun valore"
    }   
}

var msg = {email: "mario.rossi@html.it", message: "Buongiorno!"};
//console.log(inviaMessaggio(msg))


// Interface Extends

interface Bird {
    fly(): void;
}

interface Duck extends Bird {
    swim(): void;
}

function mallardDuck(): Duck {
 const fly = () => {
   // logic to fly
   console.log("Sto volando")
 };
 const swim = () => {
   // logic to swim
   console.log("Sto nuotando")
 };
 return { fly, swim };
}

const myDuck = mallardDuck();
myDuck.fly();
myDuck.swim();


class Persona {
    nome: string;
    cognome: string; 
    constructor(nome, cognome) {
		this.nome = nome;
		this.cognome = cognome;
    }
	static concatena(a:string, b:string) {
		return a + " " + b;
	}
}

console.log(Persona.concatena("Mario", "Rossi"));  //Mario Rossi


// Overloading di funzioni, unione tipi parametri, operatore ? opzionale

function sommaArray(array: number[]){
  return array.reduce((sum:number, x:number) => sum + x)
}

function somma(x:number | number[], y?:number){
  if (typeof x === "number" ) {
    return x + y!;
  }else if (typeof x === "object" ){
    return x.reduce((sum:number, x:number) => sum + x);
  }else{
    return null;
  }
}

console.log(sommaArray([2,3,6,8,9]))

console.log(somma([2,3,6,8,9]))

import { Geometria } from "./geometria";
console.log(Geometria.circonferenza(3));
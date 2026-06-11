const input = require('readline-sync');

let a = Number(input.question("Insira o primeiro numero: "));
let b = Number(input.question("Insira o segundo numero: "));

function min(a, b){
    if(a > b){
        return(b);
    }
    else{
        return(a);
    }
}

const minArrow = (a, b) => a > b ? b : a;

console.log(`Menor numero: ${min(a, b)}`);
console.log(`Menor numero com arrow: ${minArrow(a, b)}`);
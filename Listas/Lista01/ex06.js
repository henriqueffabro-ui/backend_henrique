const input = require('readline-sync');
let n = Number(input.question("Digite um numero: "));

while(n > 0){
    console.log(n);
    n--;
}

console.log("Fim!");
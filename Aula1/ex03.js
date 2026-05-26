const input = require('readline-sync');
let total = 0, media;

for (let i = 0; i < 5; i++) {
    const n= Number(input.question(" Digite a nota : ")); // Number() converte o input para número, fazendo com que seja possível utilizar o valor em contas matemáticas
    total = total + n;
}

media = total / 5;

if(media >= 7){
    console.log("A média é: ", media, ". Aprovado");
}
else if(media >= 5){
    console.log("A média é: ", media, ". Em recuperação");
}
else {
    console.log("A média é: ", media, ". Reprovado")
}
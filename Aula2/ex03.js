const soma = (n1, n2) => n1 + n2;
const subtracao = (n1, n2) => n1 - n2;
const multiplicacao = (n1, n2) => n1 * n2;
const divisao = (n1, n2) => {
    if(n2 == 0){
        return "Erro: Não é possível dividir por 0"
    } else{
        return n1 / n2;
    } 
}

const input = require('readline-sync');
const n1= Number(input.question(" Digite o primeiro numero : "));
const n2= Number(input.question(" Digite o segundo numero : "));

console.log("O resultado da soma é: ", soma(n1,n2));

console.log("O resultado da subtração é: ", subtracao(n1,n2));

console.log("O resultado da multiplicação é: ", multiplicacao(n1,n2));

console.log("O resultado da divisão é: ", divisao(n1,n2));

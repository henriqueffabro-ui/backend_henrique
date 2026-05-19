const input = require('readline-sync');
let par = 0, impar = 0;

for(let i = 0; i < 10; i++){
    const n = Number(input.question("Digite um numero: "));

    if(n % 2 === 0){
        // === compara o valor e tipo
        // == converte para o mesmo tipo e compara o valor
        par++;
    }
    else{
        impar++;
    }

}

console.log(`Quantidade de Pares: ${par}\nQuantidade de impares: ${impar}`);
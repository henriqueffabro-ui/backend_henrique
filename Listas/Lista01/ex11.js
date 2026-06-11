const input = require('readline-sync');
let idade = input.question("Digite sua idade: ");

const podeVotar = (idade) => idade >= 16;
    
if(podeVotar(idade)){
    console.log("Idade válida - Você pode votar");
}
else{
    console.log("Idade inválida - Você não pode votar");
}

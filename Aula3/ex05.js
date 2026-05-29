const produtos = [

];

const input = require('readline-sync');
for(let i = 1; i < 4; i++){
    const nome = input.question("Insira o nome do produto: ")
    const valor = Number(input.question("Insira o valor do produto: "));

    produtos.push({id : i, nome: nome, valor: valor});
    
}

console.log("Produtos inseridos:\n", produtos);

const filtro = produtos.filter(p => p.valor > 20);
console.log("Filtro: > R$20,00\n", filtro);

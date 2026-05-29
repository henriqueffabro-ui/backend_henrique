const produtos = [
    { id: 1, nome: "Rexona", valor: 15},
    { id: 2, nome:"Hidratante", valor: 20},
    { id: 3, nome:"Sabonete Barra", valor: 5},
    { id: 4, nome:"Chocolate", valor: 11}
];

for(let i = 0; i < produtos.length; i++){
    console.log(`ID: ${produtos[i].id}\nProduto: ${produtos[i].nome}\nValor: ${produtos[i].valor}`)
}

produtos.push({ id: 5, nome: "Água com Gás", valor: 4 });

console.log("Novo tamanho do array após o push:", produtos.length);
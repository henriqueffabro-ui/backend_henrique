const produtos = [
    {id: 1, nome:"Chocolate", valor: 11},
    {id: 2, nome:"Sonho de Valsa", valor: 3},
    {id: 3, nome:"Ouro Branco", valor: 3},
    {id: 4, nome:"KitKat", valor: 4},
    {id: 5, nome:"Nutella", valor: 101}
];

const idFind = produtos.find(p => p.id === 3);
console.log(idFind);

const valorFilter = produtos.filter(p => p.valor > 100);
console.log(valorFilter);

const nomeMap = produtos.map(p => {
    return {
        nome: p.nome,
    };
});
console.log(nomeMap);

produtos.forEach(p => {
    console.log(`id: ${p.id} - Nome: ${p.nome} - Valor: R$ ${p.valor}`);
});
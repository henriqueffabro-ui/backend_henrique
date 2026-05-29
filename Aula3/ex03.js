const produtos = [
    { id: 1, nome:"Rexona", valor: 150},
    { id: 2, nome:"Hidratante", valor: 20},
    { id: 3, nome:"Sabonete Barra", valor: 5},
    { id: 4, nome:"Chocolate", valor: 110}
];

const produto = produtos.find(p => p.id === 3);
console.log(produto.nome);

const filtro = produtos.filter(p => p.valor > 50);
console.log(filtro);


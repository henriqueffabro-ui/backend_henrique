const alunos = [
    {id: 1, nome: "João", nota: 7.5},
    {id: 2, nome: "Maria", nota: 9.0},
    {id: 3, nome: "Pedro", nota: 6.0},
    {id: 4, nome: "Ana", nota: 8.5},
    {id: 5, nome: "Lucas", nota: 5.0}
];

const situacao = alunos.map(a => {
    return {
        nome: a.nome,
        nota: a.nota,
        situacao: a.nota >= 7 ? "Aprovado" : "Reprovado"
    };
});

console.log(situacao);

const aprovados = alunos.filter(a => a.nota >= 7);
console.log(`Alunos Aprovados: ${aprovados.length}`);

let soma = 0, media = 0;

for(let i = 0; i < alunos.length; i++){
    soma+= alunos[i].nota;
}

media = soma / alunos.length;

console.log(`A média da sala é: ${media}`);

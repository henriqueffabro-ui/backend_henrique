const alunos = [
    {id: 1, nome: "João", nota: 7.5},
    {id: 2, nome: "Maria", nota: 9.0},
    {id: 3, nome: "Pedro", nota: 6.0},
    {id: 4, nome: "Ana", nota: 8.5},
    {id: 5, nome: "Lucas", nota: 5.0}
];

const aprovacoes = alunos.map(a => {
    return {
        nome: a.nome,
        nota: a.nota,
        situacao: a.nota >= 7 ? "Aprovado" : "Reprovado"
    };
});

console.log(aprovacoes);
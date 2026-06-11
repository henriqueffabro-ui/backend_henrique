const calcular = (a, b, operacao) => console.log(operacao(a, b));

calcular(
    3, //define o a
    7, //define o b
    (a, b) => a + b //arrow function pra operacao (operacao = (a, b) => a + b) que é chamada em calcular
);
calcular(3, 7, (a, b) => a - b);
calcular(3, 7, (a, b) => a * b);
calcular(3, 7, (a, b) => a / b);

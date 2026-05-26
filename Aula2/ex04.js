const executarOperacao = (a, b, operacao) => console.log(operacao(a, b));

executarOperacao(10, 5, (a, b) => a + b);
executarOperacao(10, 5, (a, b) => a - b);
executarOperacao(10, 5, (a, b) => a * b);
executarOperacao(10, 5, (a, b) => a / b);

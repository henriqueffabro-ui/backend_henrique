const input = require('readline-sync');
const n1= input.question(" Digite o primeiro numero : ");
const n2= input.question(" Digite o segundo numero : ");
const op= input.question(" Digite a operaçao : ");

if (op == "+") {
    console.log(`O resultado da soma é : ${Number(n1) + Number(n2)}`);
}
else if (op == "-") {
    console.log(`O resultado da subtração é : ${Number(n1) - Number(n2)}`);
}
else if (op == "*") {
    console.log(`O resultado da multiplicação é : ${Number(n1) * Number(n2)}`);
}
else if (op == "/") {
    if (n2 == 0 || n1 == 0) {
        console.log("Não é possível dividir por zero.");
    } else {
    console.log(`O resultado da divisão é : ${Number(n1) / Number(n2)}`);
    }
}
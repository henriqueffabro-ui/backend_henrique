const input = require('readline-sync');
const n = Number(input.question("Digite um numero para efetuar a tabuada: "));
for (let i = 1; i <= 10; i++){
    console.log(`${i} x ${n} = ${i * n}`);
    //Atenção: para usar o template strings ${}, é necessário utilizar o acento ` , e não aspas simples '
}
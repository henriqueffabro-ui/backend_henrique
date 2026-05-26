const input = require('readline-sync');
let i = 0;
const NSecreto = 42;

while(true){
    const tentativa = Number(input.question("Digite uma tentativa: "));
    i++;

    if(tentativa > NSecreto){
        console.log("O numero secreto é menor");
    }
    else if (tentativa < NSecreto){
        console.log("O numero secreto é maior");
    }
    else{
        console.log(`Parábens! O numero secreto é ${NSecreto}\nNúmero de tentativas: ${i}`);
        break;
    }
}
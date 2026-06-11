const input = require('readline-sync');

let n = Number(input.question("Digite o tamanho do tabuleiro: "));

let tabuleiro = "";

for(let linha = 0; linha < n; linha++){
    
    for(let coluna= 0; coluna < n; coluna++){
        if((linha + coluna) % 2 == 0){
            tabuleiro += " ";
        }
        else{
            tabuleiro += "#";
        }
    }
 
    tabuleiro += "\n";

}

console.log(tabuleiro);
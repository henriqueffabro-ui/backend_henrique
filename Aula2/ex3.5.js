const validarSenha = (senha) => senha.length >= 8;
    
const input = require('readline-sync');
let senha = input.question("Digite a senha: ");

if(validarSenha(senha)){
    console.log("Senha válida")
}
else{
    console.log("Senha inválida - Mínimo 8 caracteres")
}

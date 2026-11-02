const { randomUUID } = require('node:crypto');

const sessoes = new Map(); // token -> id do usuario

function criar(usuarioId) {
    const token = randomUUID(); // gera etiqueta aleatoria e unica
    sessoes.set(token, usuarioId); // armazena o token e o id em sessoes
    return token; // devolve o token 
}

function usuarioIdDaSessao(token) { // consulta o sessoes para descobrir a qual usuário determinado token pertence
    return sessoes.get(token); // o id, ou undefined se nao existe
}

function encerrar(token) { // remove o token do Map, encerrando a sessao
    sessoes.delete(token);
}

module.exports = { criar, usuarioIdDaSessao, encerrar };

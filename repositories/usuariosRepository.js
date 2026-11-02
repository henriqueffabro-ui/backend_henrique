const db = require('../banco.js');

// Faz busca de usuário, é chamada em login no authService.js para verificar se o usuario logando existe ou não
// Também busca a senha para verificar se confere
function buscarPorUsuario(usuario) {
    return db.prepare('SELECT * FROM usuarios WHERE usuario = ?').get(usuario);
}

// Busca de usuário por id, busca apenas id e nome 
function buscarPorId(id) {
    return db.prepare('SELECT id, usuario FROM usuarios WHERE id = ?').get(id);
}

module.exports = { buscarPorUsuario, buscarPorId };

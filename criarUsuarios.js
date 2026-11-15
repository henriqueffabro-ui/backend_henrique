const bcrypt = require('bcrypt');
const db = require('./banco.js');

async function criarUsuariosDeTeste() {

    const senhaDiego = await bcrypt.hash('1234', 10);
    const senhaAluno = await bcrypt.hash('senha', 10);
    const inserir = db.prepare(
        'INSERT INTO usuarios (usuario, senha_hash) VALUES (?, ?)'
    );
    inserir.run('diego', senhaDiego);
    inserir.run('aluno', senhaAluno);
}

criarUsuariosDeTeste()
    .then(() => console.log('Usuarios criados com hash.'))
    .catch((erro) => {
        console.error('Nao foi possivel criar usuarios:', erro);
        process.exitCode = 1;
});

// Consulta que prova que as senhas 1234 e senha não aparecem armazenados.
function consultaTeste() {
    const usuarios = db.prepare('SELECT * FROM usuarios').all();
    console.log('Usuarios no banco de dados:');
    console.table(usuarios);
}

consultaTeste();

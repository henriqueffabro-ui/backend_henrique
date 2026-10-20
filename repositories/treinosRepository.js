const db = require('../banco.js');

// Lista todos os treinos, com filtro e busca 
function listarTodos(minimo, busca) {
    let sql = 'SELECT * FROM treinos WHERE 1 = 1';
    const parametros = [];

    if (minimo !== undefined) {
        sql += ' AND duracao >= ?';
        parametros.push(minimo);
    }

    if (busca !== undefined) {
        sql += ' AND nome LIKE ?';
        parametros.push(`%${busca}%`);
    }

    sql += ' ORDER BY duracao DESC';

    return db.prepare(sql).all(...parametros);
}

function buscarPorId(id) {
    return db.prepare('SELECT * FROM treinos WHERE id = ?').get(id);
}

function criar(nome, duracao) {
    const resultado = db
        .prepare('INSERT INTO treinos (nome, duracao) VALUES (?, ?)')
        .run(nome, duracao);
    return buscarPorId(resultado.lastInsertRowid);
}

function atualizar(id, nome, duracao) {
    db.prepare('UPDATE treinos SET nome = ?, duracao = ? WHERE id = ?')
      .run(nome, duracao, id);
    return buscarPorId(id);
}

function remover(id) {
    const resultado = db.prepare('DELETE FROM treinos WHERE id = ?').run(id);
    return resultado.changes > 0;
}

function buscarTotal() {
    return db.prepare(
        'SELECT COUNT(*) AS total FROM treinos'
    ).get();
}

// ROUND para arredonar a média para 2 casas decimais
function buscarResumo() {
    return db.prepare(`
        SELECT
            COUNT(*) AS total,
            SUM(duracao) AS duracao_total,
            ROUND(AVG(duracao), 2) AS duracao_media
        FROM treinos
    `).get();
}


module.exports = { listarTodos, buscarPorId, criar, atualizar, remover, buscarTotal, buscarResumo };

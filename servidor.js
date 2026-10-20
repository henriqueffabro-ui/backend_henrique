// ============================================================
// API do Diario de Treinos
// Back-End I - CEEP Pedro Boaretto Neto
// ============================================================
// Este arquivo esta quase vazio DE PROPOSITO.
// Hoje voce vai escrever as rotas, uma de cada vez, conferindo
// no testes.http se cada uma responde o status certo.
// O que cada rota deve fazer esta no README.md.
// ============================================================

const express = require('express');
const app = express();

// Faz o Express entender JSON no corpo das requisicoes
app.use(express.json());

// ------------------------------------------------------------
// Os dados moram aqui, na memoria. Somem quando o servidor cai.
// (Na Aula 03 isso vira banco de dados.)
// ------------------------------------------------------------
const { DatabaseSync } = require('node:sqlite');
const db = new DatabaseSync('treinos.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS treinos (
        id      INTEGER PRIMARY KEY AUTOINCREMENT,
        nome    TEXT    NOT NULL,
        duracao INTEGER NOT NULL
    )
`);

//console.log(db.prepare('SELECT * FROM treinos').all());


// ------------------------------------------------------------
// Validacao
// Escreva a funcao validarTreino(corpo), que devolve a mensagem
// de erro quando algo esta errado, ou null quando esta tudo certo.
// ------------------------------------------------------------

function validarTreino(corpo) {
    if (typeof corpo.nome !== 'string' || corpo.nome.trim() === '') {
        return 'O campo nome e obrigatorio e deve ser um texto.';
    }

    if (typeof corpo.duracao !== 'number' || corpo.duracao <= 0) {
        return 'O campo duracao e obrigatorio e deve ser um numero maior que zero.';
    }

    return null;
}

// ------------------------------------------------------------
// GET /treinos - lista todos os treinos
// Adiciona filtro,  ordenacao decrescente por duração e busca por nome
// ------------------------------------------------------------

app.get('/treinos', (req, res) => {
    const { minimo, busca } = req.query;

    let sql = 'SELECT * FROM treinos WHERE 1 = 1';
    const parametros = [];

    if (minimo !== undefined) {
        const duracaoMinima = Number(minimo);

        if (minimo.trim() === '' || !Number.isFinite(duracaoMinima) || duracaoMinima < 0) {
            return res.status(400).json({
                erro: 'O parametro minimo deve ser um numero maior ou igual a zero.'
            });
        }

        sql += ' AND duracao >= ?';
        parametros.push(duracaoMinima);
    }

    if (busca !== undefined) {
        if (typeof busca !== 'string' || busca.trim() === '') {
            return res.status(400).json({
                erro: 'O parametro busca deve conter um texto.'
            });
        }

        sql += ' AND nome LIKE ?';
        parametros.push(`%${busca.trim()}%`);
    }

    sql += ' ORDER BY duracao DESC';

    const treinos = db.prepare(sql).all(...parametros);

    res.status(200).json(treinos);
});

// ------------------------------------------------------------
// GET /treinos/total - busca o total de treinos
// ------------------------------------------------------------

app.get('/treinos/total', (req, res) => {
    const total = db.prepare(`SELECT COUNT(*) as total FROM treinos`).get();
    res.status(200).json(total);
});

// ------------------------------------------------------------
// GET /treinos/resumo - devolve o resumo
// ------------------------------------------------------------

app.get('/treinos/resumo', (req, res) => {
    const resumo = db.prepare(`
        SELECT COUNT(*) AS total,
            SUM(duracao) AS duracao_total,
            AVG(duracao) AS duracao_media
        FROM treinos
    `).get();

    res.status(200).json(resumo);
});

// ------------------------------------------------------------
// GET /treinos/:id - busca um treino pelo id (404 se nao existir)
// ------------------------------------------------------------

app.get('/treinos/:id', (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ erro: 'ID invalido.' });
    }

    const treino = db.prepare(`SELECT * FROM treinos WHERE id = ?`).get(id);
    
    if (treino === undefined) {
        return res.status(404).json({ erro: 'Treino nao encontrado.' });
    }

    res.status(200).json(treino);
});

// ------------------------------------------------------------
// POST /treinos - cria um treino (400 se os dados forem invalidos)
// ------------------------------------------------------------

app.post('/treinos', (req, res) => {
    const {nome, duracao} = req.body || {}; 
    const erro = validarTreino(req.body);

    if (erro !== null) {
        return res.status(400).json({ erro: erro });
    }

    const novoTreino = db.prepare(`INSERT INTO treinos (nome, duracao) VALUES (?, ?)`).run(nome, duracao);

    const selectLast = db.prepare('SELECT * FROM treinos WHERE id = ?');
    const novoProduto = selectLast.get(novoTreino.lastInsertRowid);

    res.status(201).json(novoProduto);
});



// ------------------------------------------------------------
// PUT /treinos/:id - substitui um treino
// ------------------------------------------------------------

app.put('/treinos/:id', (req, res) => {
    const {nome, duracao} = req.body || {}; 
    const id = Number(req.params.id);

    const treino = db.prepare(`SELECT * FROM treinos WHERE id = ?`).get(id);

    if (treino === undefined) {
        return res.status(404).json({ erro: 'Treino nao encontrado.' });
    }
    const erro = validarTreino(req.body);

    if (erro !== null) {
        return res.status(400).json({ erro: erro });
    }

    db.prepare(`UPDATE treinos SET nome = ?, duracao = ? WHERE id = ?
    `).run(nome.trim(), duracao, id);

    const treinoAtualizado = db.prepare('SELECT * FROM treinos WHERE id = ?').get(id);

    return res.status(200).json(treinoAtualizado);
});


// ------------------------------------------------------------
// DELETE /treinos/:id - remove um treino
// ------------------------------------------------------------

app.delete('/treinos/:id', (req, res) => {
    const id = Number(req.params.id);

     const treino = db.prepare(`SELECT * FROM treinos WHERE id = ?`).get(id);

    if (treino === undefined) {
        return res.status(404).json({ erro: 'Treino nao encontrado.' });
    }

    db.prepare(`DELETE FROM treinos WHERE id = ?`).run(id);

    res.status(204).end();
});

// ------------------------------------------------------------
const PORTA = 3000;
app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});

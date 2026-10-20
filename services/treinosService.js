const repository = require('../repositories/treinosRepository.js');

function validarTreino(corpo) {
    if (typeof corpo.nome !== 'string' || corpo.nome.trim() === '') {
        return 'O campo nome e obrigatorio e deve ser um texto.';
    }
    if (typeof corpo.duracao !== 'number' || corpo.duracao <= 0 || corpo.duracao > 180) {
        return 'O campo duracao e obrigatorio, deve ser um numero maior que zero e menor que 180.';
    }
    return null;
}

function listarTodos(minimo, busca) {
    let duracaoMinima;

    if (minimo !== undefined) {
        if (
            typeof minimo !== 'string' ||
            minimo.trim() === '' ||
            !Number.isFinite(Number(minimo)) ||
            Number(minimo) < 0
        ) {
            return {
                erro: 'O parametro minimo deve ser um numero maior ou igual a zero.'
            };
        }

        duracaoMinima = Number(minimo);
    }

    let nomeBusca;

    if (busca !== undefined) {
        if (typeof busca !== 'string' || busca.trim() === '') {
            return {
                erro: 'O parametro busca deve conter um texto.'
            };
        }

        nomeBusca = busca.trim();
    }

    return {
        treinos: repository.listarTodos(duracaoMinima, nomeBusca)
    };
}

function buscarPorId(id) {
    return repository.buscarPorId(id);
}

function criarTreino(corpo) {
    const erro = validarTreino(corpo);
    if (erro !== null) return { erro: erro };
    const novo = repository.criar(corpo.nome, corpo.duracao);
    return { treino: novo };
}

function atualizarTreino(id, corpo) {
    const existente = repository.buscarPorId(id);
    if (existente === undefined) return { naoEncontrado: true };
    const erro = validarTreino(corpo);
    if (erro !== null) return { erro: erro };
    const atualizado = repository.atualizar(id, corpo.nome, corpo.duracao);
    return { treino: atualizado };
}

function removerTreino(id) {
    const existente = repository.buscarPorId(id);
    if (existente === undefined) return { naoEncontrado: true };
    repository.remover(id);
    return { removido: true };
}

function buscarResumo() {
    return repository.buscarResumo();
}

function buscarTotal() {
    return repository.buscarTotal();
}

module.exports = {
    listarTodos,
    buscarPorId,
    criarTreino,
    atualizarTreino,
    removerTreino,
    buscarResumo,
    buscarTotal
};

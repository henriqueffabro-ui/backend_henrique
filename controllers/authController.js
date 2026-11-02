function lerCookie(req, nome) {
    const cabecalho = req.headers.cookie; // "sid=9f2c; tema=escuro" ou undefined - lê os cookies que vieram na requisição

    if (!cabecalho) return null;

    const pares = cabecalho.split(';'); // ["sid=9f2c", " tema=escuro"] - separa em pares chave=valor

    for (const par of pares) { // percorre cada par ("sid=9f2c", " tema=escuro")
        const [chave, valor] = par.trim().split('=');
        // essa const separa o par em chave e valor, e trim() remove espaços em branco do começo e do fim
        // exemplo: " tema=escuro" -> "tema=escuro" -> ["tema", "escuro"]. A chave vai ser "tema" e o valor vai ser "escuro"

    if (chave === nome) return valor; // se a chave for igual ao nome do cookie que queremos, devolve o valor do cookie
    }
    return null;
}

const service = require('../services/authService.js');
const sessoes = require('../sessoes.js');
const usuariosRepository = require('../repositories/usuariosRepository.js');

function login(req, res) {
    const usuario = (req.body.usuario ?? '').trim();
    const senha = req.body.senha ?? '';
    const resultado = service.login(usuario, senha);
    if (resultado.invalido === true){
    // 401: "nao sei quem voce e". De proposito nao dizemos se foi o
    // usuario ou a senha que errou, para nao ajudar quem tenta adivinhar.
        return res.status(401).json({ erro: 'Usuario ou senha invalidos.' });
    }
    const token = sessoes.criar(resultado.usuario.id); // envia o id do usuario para criar a sessao e receber o token
    res.cookie('sid', token, { httpOnly: true }); // envia 
    res.status(200).json(resultado.usuario); // devolve o usuario sem a senha, para saber quem esta logado
}

function usuarioDaRequisicao(req) {
    const token = lerCookie(req, 'sid'); // lê o token do cookie da requisição
    if (token === null) return null; // nao mandou cookie
    const id = sessoes.usuarioIdDaSessao(token); // busca o id do usuario a partir do token
    if (id === undefined) return null; // cookie vencido ou invalido
    return usuariosRepository.buscarPorId(id); // { id, usuario } - retorna o usuario no banco de dados a partir do id
}

function perfil(req, res) {
    const dono = usuarioDaRequisicao(req); // a função usuarioDaRequisicao retorna o usuario, caso esteja logado
    if (dono === null){
        return res.status(401).json({ erro: 'Faca login primeiro.' });
    }
    res.status(200).json(dono); // a rota agora SABE quem e
}

function logout(req, res) {
    const token = lerCookie(req, 'sid'); // lê o token do cookie da requisição
    if (token !== null) sessoes.encerrar(token); // remove o token do Map, encerrando a sessao
        res.clearCookie('sid'); // apaga o cookie do navegador 
        res.status(204).end();
}

module.exports = { login, perfil, logout, usuarioDaRequisicao };

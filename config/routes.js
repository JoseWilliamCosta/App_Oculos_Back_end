module.exports = app => {
    // Rotas de usuários
    app.post('/usuarios/signin', app.api.auth.signin)
    app.post('/usuarios/signup', app.api.usuarios.signup)
    app.post('/usuarios/list', app.api.usuarios.listUsuarios)
    app.post('/usuarios/get', app.api.usuarios.getUsuario)
    app.post('/usuarios/update', app.api.usuarios.updateUsuario)
    app.post('/usuarios/rem', app.api.usuarios.remUsuario)

    // Rotas de óculos
    app.post('/oculos/cadastrar', app.api.oculos.cadastrarOculos)
    app.post('/oculos/listar', app.api.oculos.listarOculos)
    app.post('/oculos/atualizar', app.api.oculos.atualizarOculos)
    app.post('/oculos/remover', app.api.oculos.removerOculos)
    app.post('/oculos/getOculos', app.api.oculos.getOculos)

    // Rotas de detecção de proximidade
    app.post('/deteccao/salvar', app.api.deteccao.cadastrarOuAtualizarDeteccao)
    app.post('/deteccao/listar', app.api.deteccao.listarDeteccoes)
}

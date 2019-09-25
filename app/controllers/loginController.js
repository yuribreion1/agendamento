module.exports.login = function (app, req, res) {
    req.assert('matricula', 'Matricula é campo obrigatório').notEmpty();
    req.assert('senha', 'Senha é um campo obrigatorio').notEmpty();
    var acesso = req.body;

    var erros = req.validationErrors();

    if (erros) {
        res.render('erro', { erro: erros })
        return;
    }

    var connection = app.infra.connectionFactory();
    var acessoDAO = new app.models.AcessoDAO(connection);
    acessoDAO.listaUsuario(acesso.matricula, acesso.senha, function (err, data) {
        var retornoDb = data.fetchSync({fetchMode:4});
        
        if (retornoDb === null) {
            res.render('login/nao-autorizado')
        } else {
            var matriculaDb = retornoDb.MATRICULA;
            var senhaDb = retornoDb.SENHA;                
            if (acesso.senha == senhaDb) {
                res.cookie('matricula', acesso.matricula, { maxAge: 500000 });
                res.render('login/menu')
            } else if (matriculaDb === null) {
                res.render('login/nao-autorizado')
            }
        } 
    })
    connection.close(function (err) {
    });
}
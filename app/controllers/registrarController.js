module.exports.registrar = function (app, req, res) {
    req.assert('matricula', 'Matricula é campo obrigatório').notEmpty();
    req.assert('senha', 'Senha é um campo obrigatorio').notEmpty();

    var erros = req.validationErrors();

    if (erros) {
        res.render('erro', {
            erro: erros
        })
        return;
    }

    var acesso = req.body;
    var connection = app.infra.connectionFactory();
    var acessoDAO = new app.models.AcessoDAO(connection);
    acessoDAO.insere(acesso, function (err, data) {
        if (!err) {
            res.redirect('/?registrado=true')
        } else {
            console.log('Erro na autenticação, acionar seu suporte');
        }
    })
    connection.close(function (err) {});
}
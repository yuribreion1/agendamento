module.exports.removerSala = function (app, req, res) {
    var connection = app.infra.connectionFactory();
    var agendamentoDAO = new app.models.AgendamentoDAO(connection);
    agendamentoDAO.remove(req.params.id, function (err, data) {
        if (!err) {
            res.redirect('/login?removido=true');
        } else {
            res.send("<h1>Houve um erro</h1>")
        }
    })
    connection.close(function (err) {
        if (err) {
            console.log('Erro')
        }
    })
}

module.exports.solicitaSala = function (app, req, res) {
    req.assert('data','Uma data deve ser fornecida').notEmpty();
    var solicitacao = req.body;
    var erros = req.validationErrors();

    if (erros) {
        console.log(erros)
        res.render('erro', { erro: erros })
        return;
    }
    solicitacao.solicitante = req.cookies.matricula
    console.log(solicitacao)
    var connection = app.infra.connectionFactory();
    var agendamentoDAO = new app.models.AgendamentoDAO(connection);
    agendamentoDAO.insere(solicitacao, function (err, data) {
        if (!err) {
            console.log('Agendamento feito com sucesso');
            res.redirect('/login?cadastrado=true')
        } else {
            console.log('Erro no agendamento, acionar o suporte' + err);
            res.status(404).render('erro', {
                erro: err
            });
        }
    })
    connection.close(function (err) {});
}

module.exports.consultaAgendamento = function (app, req, res) {
    var usuario = req.cookies.matricula;
    var connection = app.infra.connectionFactory();
    var agendamentoDAO = new app.models.AgendamentoDAO(connection);
    if (usuario == 'admin') {
        agendamentoDAO.listaAdmin(function (err, data) {
            var retornoDb = data.fetchAllSync({
                fetchMode: 4
            });
            res.format({
                'text/html': function () {
                    res.render('consultar/sala-admin', {
                        result: retornoDb
                    });
                }
            })
        })
        connection.close(function (err) {})
    } else {
        agendamentoDAO.lista(usuario, function (err, data) {
            var retornoDb = data.fetchAllSync({
                fetchMode: 4
            });
            if (!err) {
                res.format({
                    'text/html': function () {
                        res.render('consultar/sala', {
                            result: retornoDb
                        })
                    }
                })
            } else {
                res.send("<h1>Houve um erro</h1>")
            }
        })
    }

    connection.close(function (err) {});
}

module.exports.consultaAgendamentoAPI = function (app, req, res) {
    var usuario = req.cookies.matricula;
    var connection = app.infra.connectionFactory();
    var agendamentoDAO = new app.models.AgendamentoDAO(connection);
    agendamentoDAO.listaAdmin(function (err, data) {
        var retornoDb = data.fetchAllSync({
            fetchMode: 4
        });
        if (!err) {
            res.format({
                json: function () {
                    res.json(retornoDb)
                }
            })
        } else {
            res.send("<h1>Houve um erro</h1>")
        }
    })
    connection.close(function (err) {});
}

module.exports.solicitaSalaAPI = function (app, req, res) {
    var solicitacao = req.body;
    var connection = app.infra.connectionFactory();
    var agendamentoDAO = new app.models.AgendamentoDAO(connection);
    agendamentoDAO.insere(solicitacao, function (err, data) {
        if (!err) {
            res.status(200).json( { cadastrado: true, msg: 'Sala solicitada com sucesso' } )
        } else {
            console.log(err)    
            res.status(403).json( { cadastrado: false, msg: 'Solicitação não realizada, favor corrigir' })
        }
    })
    connection.close(function (err) {});
}
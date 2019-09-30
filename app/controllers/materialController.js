module.exports.removeMaterial = function (app, req, res) {
    var connection = app.infra.connectionFactory();
    var materialDAO = new app.models.MaterialDAO(connection);
    materialDAO.remove(req.params.id, function (err, data) {
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

module.exports.consultaMaterial = function (app, req, res) {
    var usuario = req.cookies.matricula;
    var connection = app.infra.connectionFactory();
    var materialDAO = new app.models.MaterialDAO(connection);
    if (usuario == 'admin') {
        materialDAO.listaAdmin(function (err, data) {
            var retornoDb = data.fetchAllSync({
                fetchMode: 4
            });
            res.format({
                'text/html': function () {
                    res.render('consultar/material-admin', {
                        result: retornoDb
                    });
                }
            })
        })
        connection.close(function (err) {})
    } else {
        materialDAO.lista(usuario, function (err, data) {
            var retornoDb = data.fetchAllSync({
                fetchMode: 4
            });
            if (!err) {
                res.format({
                    'text/html': function () {
                        res.render('consultar/material', {
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

module.exports.consultaMaterialAPI = function (app, req, res) {
    var connection = app.infra.connectionFactory();
    var materialDAO = new app.models.MaterialDAO(connection);
    materialDAO.listaAdmin(function (err, data) {
        var retornoDb = data.fetchAllSync({
            fetchMode: 4
        });
        if (!err) {
            res.format({
                'json': function () {
                    res.json(retornoDb);
                }
            })
        } else {
            res.status(400).render('erro');
        }
    })
    connection.close(function (err) {});
}

module.exports.solicitaMaterial = function (app, req, res) {
    var solicitacao = req.body;
    solicitacao.solicitante = req.cookies.matricula
    var connection = app.infra.connectionFactory();
    var materialDAO = new app.models.MaterialDAO(connection);
    console.log(solicitacao);
    materialDAO.insere(solicitacao, function (err, data) {
        if (!err) {
            console.log('Material solicitado com sucesso');
            res.redirect('/login?cadastrado=true')
        } else {
            console.log('Erro na solicitação, acionar o suporte' + err);
            res.status(404).render('erro', {
                erro: err
            });
        }
    })
    connection.close(function (err) {});
}

module.exports.solicitaMaterialAPI = function (app, req, res) {
    var solicitacao = req.body;
    var connection = app.infra.connectionFactory();
    var materialDAO = new app.models.MaterialDAO(connection);
    materialDAO.insere(solicitacao, function (err, data) {
        if (!err) {
            res.status(200).json( { cadastrado: true, msg: 'Material solicitada com sucesso' } )
        } else {
            res.status(403).json( { cadastrado: false, msg: 'Solicitação não realizada, favor corrigir' })
        }
    })
    connection.close(function (err) {});
}
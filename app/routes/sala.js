module.exports = function (app) {
    app.get('/consultar/sala', function (req, res) {
        app.controllers.salaController.consultaAgendamento(app, req, res);
    })
    app.get('/api/consultar/sala', function (req, res) {
        app.controllers.salaController.consultaAgendamentoAPI(app, req, res);
    })
    app.get("/remover/sala/:id", function (req, res) {
        app.controllers.salaController.removerSala(app, req, res);
    })
    app.get('/solicitar/sala', function (req, res) {
        res.render('solicitar/sala')
    })
    app.post('/solicitar/sala', function (req, res) {
        app.controllers.salaController.solicitaSala(app, req, res);
    })
    app.post('/api/solicitar/sala', function (req, res) {
        app.controllers.salaController.solicitaSalaAPI(app, req, res);
    })
}
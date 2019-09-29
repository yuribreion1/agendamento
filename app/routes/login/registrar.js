module.exports = function (app) {
    app.get('/registrar', function (req, res) {
        res.render('login/registrar')
    })

    app.post('/registrar', function (req, res) {
        app.controllers.registrarController.registrar(app, req, res);
    })
    
    app.post('/api/registrar', function (req, res) {
        app.controllers.registrarController.registrarAPI(app, req, res);
    })
}
module.exports = function (app) {
    app.get('/login', function (req, res) {
        res.render('login/menu')
    })
    app.post('/login', function (req, res) {
        app.controllers.loginController.login(app, req, res);
    })

    app.post('/api/login', function (req, res) {
        app.controllers.loginController.loginAPI(app, req, res);
    })
}
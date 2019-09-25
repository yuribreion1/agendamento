module.exports = function (app) {
    app.get('/nao-autorizado', function (req, res) {
        res.render('login/nao-autorizado');
    })
}
module.exports = function (app) {
    app.get('/', function (req, res) {
        res.clearCookie('matricula');
        res.render('login/index')
    })
}
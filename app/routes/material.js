module.exports = function (app) {
    app.get("/remover/material/:id", function (req, res) {
        app.controllers.materialController.removeMaterial(app, req, res);
    })
    
    app.get('/solicitar/material', function (req, res) {
        res.render('solicitar/material')
    })

    app.post('/solicitar/material', function (req, res) {
        app.controllers.materialController.solicitaMaterial(app, req, res);
    })

    app.get('/consultar/material', function (req, res) {
        app.controllers.materialController.consultaMaterial(app, req, res);
    })
    app.get('/api/consultar/material', function (req, res) {
        app.controllers.materialController.consultaMaterialAPI(app, req, res);
    })
}
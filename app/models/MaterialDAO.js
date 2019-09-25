var listaMateriais = 'select * from material where solicitante = ? with ur';
var listaMateriaisAdmin = 'select * from material with ur';
var insereMaterial = 'INSERT INTO material (professor, material, sala, data, periodo, solicitante) VALUES(?, ?, ?, ?, ?, ?)';
var removeMaterial = 'DELETE FROM material WHERE id_material = ?';

function MaterialDao(connection) {
    this._connection = connection;
}

MaterialDao.prototype.lista = function (solicitante, callback) {
    this._connection.queryResult(listaMateriais, [solicitante], callback);
}

MaterialDao.prototype.listaAdmin = function (callback) {
    this._connection.queryResult(listaMateriaisAdmin, callback);
}

MaterialDao.prototype.insere = function (material, callback) {
    this._connection.query(insereMaterial, [material.professor, material.material, material.sala, material.data, material.periodo, material.solicitante], callback);
}

MaterialDao.prototype.remove = function (id, callback) {
    this._connection.query(removeMaterial, [id], callback);
}

module.exports = function () {
    return MaterialDao
}
var insereLogin = 'INSERT INTO acessos (matricula, senha) VALUES(?, ?)';
var listaUsuario = 'SELECT * FROM acessos WHERE MATRICULA = ? AND SENHA = ?';

function AcessoDAO(connection) {
    this._connection = connection;
}

AcessoDAO.prototype.insere = function (acesso, callback) {
    this._connection.query(insereLogin, [acesso.matricula, acesso.senha], callback)
}

AcessoDAO.prototype.listaUsuario = function (matricula, senha, callback) {
    this._connection.queryResult(listaUsuario, [matricula, senha], callback);
}

module.exports = function () {
    return AcessoDAO
}
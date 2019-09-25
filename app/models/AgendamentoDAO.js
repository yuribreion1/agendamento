var listaAgendamentos = 'select * from agendamento where solicitante = ? with ur';
var listaAgendamentosAdmin = 'select * from agendamento with ur';
var insereAgendamento = 'INSERT INTO agendamento (professor, sala, data, periodo, flag_cliente, quantidade, solicitante) VALUES(?, ?, ?, ?, ?, ?, ?)';
var removeAgendamento = 'DELETE FROM agendamento WHERE id_agendamento = ?';

function AgendamentoDao(connection) {
    this._connection = connection;
}

AgendamentoDao.prototype.lista = function (solicitante, callback) {
    this._connection.queryResult(listaAgendamentos, [solicitante], callback);
}

AgendamentoDao.prototype.listaAdmin = function (callback) {
    this._connection.queryResult(listaAgendamentosAdmin, callback);
}

AgendamentoDao.prototype.insere = function (agendamento, callback) {
    this._connection.query(insereAgendamento, [agendamento.professor, agendamento.sala, agendamento.data, agendamento.periodo, agendamento.externo, agendamento.quantidade, agendamento.solicitante], callback);
}

AgendamentoDao.prototype.remove = function (id, callback) {
    this._connection.query(removeAgendamento, [id], callback);
}

module.exports = function () {
    return AgendamentoDao
}
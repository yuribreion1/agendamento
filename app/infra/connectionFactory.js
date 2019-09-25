const fs = require('fs');

var vcapServices = fs.readFileSync("vcap-local.json", "utf-8");
var dbCredentials = JSON.parse(vcapServices);

var ibm_db = require('ibm_db'), connStr = dbCredentials.dsn;

function createDBConnection() {
    return ibm_db.openSync(connStr, (err, conn) => {
        if (!err) console.log(conn);

    });
}

module.exports = () => {
    return createDBConnection;
}
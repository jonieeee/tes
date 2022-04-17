const {mysql} = require('../config.json');
const {createConnection} = require('mysql');

let con = createConnection(mysql);

module.exports = con;
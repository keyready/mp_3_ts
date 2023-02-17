const {Sequelize} = require('sequelize');
module.exports = new Sequelize('bp', 'admin', 'admin', {
    dialect: 'postgres',
    host: 'db',
    //host:'localhost',
    port: 5432
});

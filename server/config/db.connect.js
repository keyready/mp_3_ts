const {Sequelize} = require('sequelize');
module.exports = new Sequelize('bp', 'k0fanov36', 'k0fanov36', {
    dialect: 'postgres',
    //host: 'db',
    host:'localhost',
    port: 5432
});

const {Sequelize} = require('sequelize');
module.exports = new Sequelize('bp', 'k0fanov36', 'k0fanov36', {
    dialect: 'postgres',
    host: 'db',
    port: 5432
});

const {Sequelize} = require('sequelize');
module.exports = new Sequelize('ImmortalRegiment', 'postgres', 'userSQL', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432
});

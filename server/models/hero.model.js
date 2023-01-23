const DB = require('../config/db.connect');
const {DataTypes} = require('sequelize');

module.exports = DB.define('heroes', {
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    middlename: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    story: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    rank: {
        type: DataTypes.STRING,
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false,
    tableName: 'heroes'
})

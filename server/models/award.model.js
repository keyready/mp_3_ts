const DB = require('../config/db.connect');
const {DataTypes} = require('sequelize');

module.exports = DB.define('awards',{
    title:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    description:{
        type:DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    }
},{
    timestamps:false,
    tableName:'awards'
})
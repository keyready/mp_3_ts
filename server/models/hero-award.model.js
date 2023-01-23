const DB = require('../config/db.connect');
const {DataTypes} = require('sequelize');

module.exports = DB.define('award_hero',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    }
},{
    timestamps:false,
    tableName:'award_hero'
})
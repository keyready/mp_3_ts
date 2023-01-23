const DB = require('../config/db.connect');
const {DataTypes} = require('sequelize');

module.exports = DB.define('users',{
    firstname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    middlename:{
        type:DataTypes.STRING,
        allowNull:false
    },
    lastname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    photo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'user'
    },
    isBanned:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
        allowNull:false
    },
    banReason:{
        type:DataTypes.TEXT,
    },
    link:{
        type:DataTypes.STRING,
        unique: true,
        allowNull:false
    },
    isActivated:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    }
},{
    timestamps:false,
    tableName:'users'
})
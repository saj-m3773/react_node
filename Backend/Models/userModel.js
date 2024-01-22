// ejad model dar dataBase

import {Sequelize} from "sequelize";
import db from "../config/Detabase.js";


const {DataTypes} = Sequelize

const Users =db.define('users',{
    name:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    refresh_token:{
        type:DataTypes.TEXT
    },
    image:{
        type:DataTypes.STRING
    },
    url:{
        type:DataTypes.STRING
    },
    isAdmin:{
        type:DataTypes.BOOLEAN,
        defaultValue:false
    }

},{
    // Do not select a duplicate table name
    freezeTableName:true
})

export default Users
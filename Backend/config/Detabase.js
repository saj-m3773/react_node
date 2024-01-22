import {Sequelize} from "sequelize";


const db=new Sequelize("news_sajad",'sajad77','sajad137700',{
    host:'localhost',
    dialect: "mysql"
})

export default db
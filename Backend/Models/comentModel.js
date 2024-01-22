import {Sequelize} from "sequelize";
import db from "../config/Detabase.js";
import News from "./NewsModels.js";

const {DataTypes} = Sequelize

const Comment = db.define("comments", {
    newsId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
},{
    freezeTableName: true
})

News.hasMany(Comment)
Comment.belongsTo(News, {foreignKey: "newsId"})

export default Comment
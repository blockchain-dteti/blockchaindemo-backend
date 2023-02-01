import { Sequelize, DataTypes } from "sequelize";
import db from "../config/database";


const users = db.define('user', {
    name : {
        type: DataTypes.STRING
    },
    password : {
        type: DataTypes.STRING
    },
    refreshToken : {
        type: DataTypes.TEXT
    },
}, {
    freezeTableName: true,
});

export default users;
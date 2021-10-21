const { Sequelize, DataTypes, Op } = require('sequelize');
const users = require('../models/UserModel.js');
const sessions = require('../models/SessionsModel.js');

const sequelize = new Sequelize("postgres://postgres:hellobro@localhost:5432/olx_sequelize", {logging: false, define: {freezeTableName: true}})

async function postgres(){
    try {
        await sequelize.authenticate()

        const db = {}

        // db.users = await users.create()

    } catch (error) {
        console.log("POSTGRES_DB_ERROR: ", error + "");
    }
}

postgres()
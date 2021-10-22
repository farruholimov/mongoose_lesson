const { Sequelize, DataTypes, Op } = require('sequelize');
const users = require('../models/UserModel.js');
const sessions = require('../models/SessionsModel.js');

const sequelize = new Sequelize("postgres://postgres:hellobro@localhost:5432/olx_sequelize", {logging: false, define: {freezeTableName: true}})

async function postgres(){
    try {
        await sequelize.authenticate()

        const db = {}

        db.users = await users(Sequelize, sequelize);
        db.sessions = await sessions(Sequelize, sequelize);

        await db.users.hasMany(db.sessions, {
            primaryKey: "user_id"
        })

        await db.sessions.belongsTo(db.users, {
            foreignKey: "user_id"
        })

        await sequelize.sync()
        // await sequelize.sync({force: true})

        return db;

    } catch (error) {
        console.log("POSTGRES_DB_ERROR: ", error);
    }
}

// postgres()

module.exports = postgres
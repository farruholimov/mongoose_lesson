const {
    Sequelize,
    DataTypes,
    Op
} = require('sequelize');
const users = require('../models/UserModel.js');
const sessions = require('../models/SessionsModel.js');
const ads = require('../models/AdsModel.js');
const relations = require("./relations");
const categories = require('../models/CategoriesModel.js');

const sequelize = new Sequelize("postgres://postgres:hellobro@localhost:5432/olx_sequelize", {
    logging: false,
    define: {
        freezeTableName: true
    }
})

async function postgres() {
    try {
        await sequelize.authenticate()

        const db = {}

        db.users = await users(Sequelize, sequelize);
        db.sessions = await sessions(Sequelize, sequelize);
        db.ads = await ads(Sequelize, sequelize);
        db.categories = await categories(Sequelize, sequelize);

        await relations(db);


        await sequelize.sync();
        // await sequelize.sync({force: true})

        return db;

    } catch (error) {
        console.log("POSTGRES_DB_ERROR: ", error);
    }
}

// postgres()

module.exports = postgres
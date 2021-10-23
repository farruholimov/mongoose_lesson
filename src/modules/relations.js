module.exports = async function (db) {
    await db.users.hasMany(db.sessions, {
        foreignKey: {
            name: "user_id",
            allowNull: false,
        }
    })

    await db.users.hasMany(db.ads, {
        foreignKey: {
            name: "user_id",
            allowNull: false,
        }
    })

    await db.sessions.belongsTo(db.users, {
        foreignKey: {
            name: "user_id",
            allowNull: false,
        }
    })

    await db.categories.hasMany(db.ads, {
        foreignKey: {
            name: "category_id",
            allowNull: false,
        }
    })

    await db.ads.belongsTo(db.categories, {
        foreignKey: {
            name: "category_id",
            allowNull: false,
        }
    })

    await db.ads.belongsTo(db.users, {
        foreignKey: {
            name: "user_id",
            allowNull: false,
        }
    })
}
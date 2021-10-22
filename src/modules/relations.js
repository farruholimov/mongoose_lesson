module.exports = async function (db) {
    await db.users.hasMany(db.sessions, {
        foreignKey: {
            
        }
    })

    await db.sessions.belongsTo(db.users, {
        foreignKey: "user_id"
    })
}
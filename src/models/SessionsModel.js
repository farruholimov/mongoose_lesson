module.exports = async function Users(Sequelize, sequelize) {
	return await sequelize.define(
		"sessions", {
			user_agent: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			owner_id: {
				type: Sequelize.DataTypes.UUID,
				references: "users"
			},
			created_at: {
				type: Sequelize.DataTypes.DATE(),
				defaultValue: Sequelize.NOW
			},
		}, {
			tableName: "sessions"
		}
	)
}
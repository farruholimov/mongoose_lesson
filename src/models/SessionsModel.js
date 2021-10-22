module.exports = async function Users(Sequelize, sequelize) {
	return await sequelize.define(
		"sessions", {
			session_id: {
				type: Sequelize.DataTypes.UUID,
				defaultValue: Sequelize.UUIDV4(),
				allowNull: false,
				primaryKey: true,
			},
			user_agent: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			owner_id: {
				type: Sequelize.DataTypes.UUID,
			},
		}
	)
}
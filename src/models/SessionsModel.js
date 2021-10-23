module.exports = async function Sessions(Sequelize, sequelize) {
	return await sequelize.define(
		"sessions", {
			session_id: {
				type: Sequelize.DataTypes.UUID,
				defaultValue: Sequelize.UUIDV4(),
				allowNull: false,
				primaryKey: true,
			},
			session_user_agent: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
		}
	)
}
module.exports = async function Users(Sequelize, sequelize) {
	return await sequelize.define(
		"users", {
			user_id: {
				type: Sequelize.DataTypes.UUID,
				defaultValue: Sequelize.UUIDV4(),
				allowNull: false,
				primaryKey: true,
			},
			user_name: {
				type: Sequelize.DataTypes.STRING(32),
				allowNull: false,
			},
			user_email: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			user_password: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			user_isVerified: {
				type: Sequelize.DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			}
		}
	)
}
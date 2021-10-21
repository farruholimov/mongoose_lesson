module.exports = async function Users(Sequelize, sequelize) {
	return await sequelize.define(
		"users", {
			id: {
				type: Sequelize.DataTypes.UUID,
				defaultValue: Sequelize.UUIDV4(),
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: Sequelize.DataTypes.STRING(32),
				allowNull: false,
			},
			email: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			isVerified: {
				type: Sequelize.DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			}
		}
	)
}
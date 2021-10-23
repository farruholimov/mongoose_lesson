module.exports = async function Categories(Sequelize, sequelize){
    return await sequelize.define(
        "categories", 
        {
            category_id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4(),
                primaryKey: true,
                allowNull: false,
            },
            category_name: {
                type: Sequelize.STRING(24),
                allowNull: false,
            },
            category_photo: {
                type: Sequelize.STRING,
                allowNull: false,
            }
        }
    )
}
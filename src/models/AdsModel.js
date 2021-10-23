module.exports = async function Ads(Sequelize, sequelize){
    return await sequelize.define(
        "ads",
        {
            ad_title: {
                type: Sequelize.STRING(128),
                allowNull: false,
            },
            ad_price: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            ad_user_phone: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            ad_category: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            ad_description: {
                type: Sequelize.STRING(1024),
                allowNull: false,
            },
            ad_photos: {
                type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
            }
        }
    )
}
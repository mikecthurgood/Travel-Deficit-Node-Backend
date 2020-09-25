const Sequelize = require('sequelize')
const sequelize = require('../db/tdDb')

const UserWishlist = sequelize.define('userWishlist', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    countryId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
})

module.exports = UserWishlist;

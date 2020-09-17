const Sequelize = require('sequelize')
const sequelize = require('../db/tdDb')

const Country = sequelize.define('country', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    climate: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    continent: {
        type: Sequelize.STRING,
        allowNull: false
    },
    terrain: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    population: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: true
    },
})

module.exports = Country

const Sequelize = require('sequelize')
require('dotenv').config()

const devDb = new Sequelize(process.env.DBNAME, process.env.DBUSERNAME, process.env.DBPASSWORD, {
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    storage: "./session.sqlite"
})

 const prodDb = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
    storage: "./session.sqlite"
})

const db = process.env.NODE_ENV === 'development' ? devDb : prodDb

module.exports = db
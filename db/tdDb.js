const Sequelize = require('sequelize')
require('dotenv').config()

module.exports = new Sequelize(process.env.DBNAME, process.env.DBUSERNAME, process.env.DBPASSWORD, {
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    storage: "./session.sqlite"
})

// module.exports = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres',
//     protocol: 'postgres',
//     dialectOptions: {
//         ssl: {
//           require: true,
//           rejectUnauthorized: false
//         }
//       },
//     storage: "./session.sqlite"
// })


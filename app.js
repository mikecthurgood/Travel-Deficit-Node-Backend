require('dotenv').config();
// const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
// const graphqlHttp = require('express-graphql');
const {graphqlHTTP} = require('express-graphql');

const sequelize = require('./db/tdDb')
const Country = require('./models/Country')
const User = require('./models/User')
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');
const auth = require('./middleware/auth')

const migration = require('./migration')
const {countries} = require('./country_stats.json')
const filteredCountries = countries.filter(country => country.code !== null)

const port = process.env.PORT;

const app = express()
const cors = require('cors');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(auth)

app.use (
    '/graphql',
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true,
        customFormatErrorFn(err) {
            if (!err.originalError) {
                return err
            }
            const data = err.originalError.data
            const message = err.message || "An error occurred"
            const status = err.originalError.code || 500
            return {message, status, data}
        }
    })
)

// app.get('/seed', async (req, res) => {

//     await Country.destroy({ truncate:  'cascade' })
    
//     filteredCountries.forEach(country => {
//         const {name, description, continent, population, climate, terrain, code} = country
//         Country.create({name, description, continent, population, climate, terrain, code})
//     })
//     res.json({status: 200, message: 'countries added'})
// })

app.get('/show-users', async (req, res) => {
    const users = await User.findAll()
    const returnedUsers = users.map(user => {
        return {
            username: user.username,
            friendId: user.friendrequestid
        }
    })
    res.json(returnedUsers)
})

// app.get('/dbmigrate', async (req, res) => {
//     return migration.addFriendRequestId()
// })

try {
    sequelize
    .sync()
    // .sync({ force: true })
    .then(result => {
      app.listen(port || 4000, () => console.log(`listening on port ${port}...`));
    })
    
}
catch(err) {
    console.log(err)
}
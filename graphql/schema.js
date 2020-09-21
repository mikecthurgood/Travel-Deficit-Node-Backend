const {buildSchema} = require('graphql');

module.exports = buildSchema(`
    type Country {
        id: ID!
        name: String!
        description: String!
        climate: String!
        continent: String!
        terrain: String
        population: Int!
        code: String!
        imageUrl: String
    }

    type User {
        id: ID!
        username: String!
        email: String!
        password: String
        dob: String!
        isAdmin: Boolean
    }

    type AuthData {
        token: String!
        userId: String!
        username: String!
        age: Int
    }

    input UserInputData {
        email: String
        username: String!
        password: String!
        passwordConfirmation: String
        dob: String
    }

    input UpdateUserCountry {
        userId: Int!
        CountryId: Int!
    }

    type CountryData {
        countries: [Country!]!
        loggedIn: Boolean
    }

    type RootMutation {
        createUser(userInput: UserInputData): User!
        addRemoveUserCountry(userInput: UpdateUserCountry): Boolean!
    }

    type RootQuery {
        login(username: String!, password: String!): AuthData!
        currentUser: User!
        countries: CountryData!
        getUserCountries(userId: ID!): CountryData
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)
require('dotenv').config()
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const Country = require('../models/Country')
const User = require('../models/User')
const UserCountries = require('../models/UserCountries')
const UserCountry = require('../models/UserCountries')

// const findUser = async (req) => {
//     const user = await User.findByPk(req.userId);
//     if (!user) {
//         const error = new Error('Invalid user')
//         error.data = errors
//         error.code = 401
//         throw error
//     }
//     if (user.isAdmin) {
//         req.isAdmin = true
//     }
//     return (user)
// }

// const authUser = ({isAuth}) => {
//     if (!isAuth) {
//         const error = new Error('Not authenticated')
//         error.code = 401
//         throw error
//     }
// }

module.exports = {
    countries: async ({}, req) => {
        try {
            const countries = await Country.findAll()
            return { countries }
        } catch (err) {
            console.log(err)
        }
    },

    // createUser: async ({ userInput }, req) => {
    //     try {
    //         const { dob, email, name, password, passwordConfirmation } = userInput
    //         const emailLower = email.toLowerCase()
    //         const errors = []
    //         const errorCodes = []

    //         const passWordsMatch = password === passwordConfirmation
    //         if (!passWordsMatch && validator.isLength(password, { min: 5 })) {
    //             errorCodes.push(421)
    //         }

    //         const existingUserEmail = await User.findOne({where: {email: emailLower}})
    //         if (existingUserEmail) {
    //             errorCodes.push(422)
    //         }

    //         const existingUsername = await User.findOne({where: {name}})
    //         if (existingUsername) {
    //             errorCodes.push(423)
    //         }

    //         if (!validator.isEmail(email)) {
    //             errors.push({ message: 'Email is invalid.'})
    //             errorCodes.push(424)
    //         }

    //         if (
    //             validator.isEmpty(password) || 
    //             !validator.isLength(password, { min: 5 })
    //         ) {
    //             errors.push({message: 'Password too short'})
    //             errorCodes.push(425)

    //         }

    //         if (errorCodes.length > 0) {
    //             const error = new Error('Errors exist')
    //             error.data = errorCodes
    //             error.code = 456
    //             throw error
    //         }

    //         const dateOfBirth = new Date(dob)

    //         const hashedPw = await bcrypt.hash(password, 12)
    //         return await User.create({ username, email: emailLower, password: hashedPw, dob: dateOfBirth})
    //         .then(user => {
    //             return {
    //                 ...user.dataValues
    //             }
    //         })
    //     } catch(err) {
    //         console.log(err)
    //         err.statusCode = 500
    //         return err
    //     }
    // },

    // getUserCountries: async ({ userId }) => {
    //     return await UserCountries.findAll({ where: { userId } })
    // },

    // login: async ({ email, password }) => {
    //     const emailLower = email.toLowerCase()
    //     try {

    //         const user = await User.findOne({where: {email: emailLower}})
    //         if (!user) {
    //             const error = new Error('No user found with that username or password.')
    //             error.code = 401
    //             throw error
    //         }
    
    //         const isEqual = await bcrypt.compare(password, user.password)
    //         if (!isEqual) {
    //             const error = new Error('Incorrect Password.')
    //             error.code = 401
    //             throw error
    //         }

    //         const token = jwt.sign(
    //             {
    //                 userId: user.id.toString(),
    //                 email: user.email,
    //             }, 
    //             key,
    //             // { expiresIn: '1h'}
    //         )
    //         return {token, userId: user.id.toString(), username: user.name}
    //     }
    //     catch(err) {
    //         return err
    //     }

    // },

    // addRemoveUserCountry: async ({ userId, countryId }) => {
    //     try {
    //         const existing = UserCountry.findOne({ where: userId, countryId})
    //         if (!existing) {
    //             UserCountry.create({ userId, countryId })
    //         }
    //         else {
    //             existing.destroy()
    //         }

    //         return true

    //     } catch (err) {
    //         console.log(err)
    //         return false
    //     }
    // }
}
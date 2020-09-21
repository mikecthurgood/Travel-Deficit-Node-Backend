require('dotenv').config()
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const Country = require('../models/Country')
const User = require('../models/User')
const UserCountries = require('../models/UserCountries')
const UserCountry = require('../models/UserCountries')

const key = process.env.TOKENKEY;

const authUser = ({isAuth}) => {
    if (!isAuth) {
        const error = new Error('Not authenticated')
        error.code = 401
        throw error
    }
}

const calculateAge = (date) => {
    const split_dob = date.toString().split("-");
    const month = date.getMonth()
    const day = date.getDate();
    const year = date.getFullYear();

    const todayDate = new Date();
    const todayYear = (todayDate.getFullYear()).toString();
    const todayDay = (todayDate.getDate()).toString();
    const todayMonth= (todayDate.getMonth()+1).toString();

    let ageValue
    if((month < todayMonth) || (month === todayMonth && day < todayDay )){
        ageValue = parseInt(todayYear-parseInt(year));
    } else {
        ageValue = parseInt(todayYear-parseInt(year)-1);
    }
    return ageValue
}

module.exports = {
    countries: async ({}, req) => {
        try {
            const countries = await Country.findAll()
            return { countries, loggedIn: req.isAuth }
        } catch (err) {
            console.log(err)
        }
    },

    createUser: async ({userInput}, req) => {
        console.log(userInput)
        try {
            const { dob, email, username, password, passwordConfirmation } = userInput
            const emailLower = email.toLowerCase()
            const errors = []
            const errorCodes = []

            const passWordsMatch = password === passwordConfirmation
            if (!passWordsMatch && validator.isLength(password, { min: 5 })) {
                errorCodes.push(421)
            }

            const existingUserEmail = await User.findOne({where: {email: emailLower}})
            if (existingUserEmail) {
                errorCodes.push(422)
            }

            const existingUsername = await User.findOne({where: {username}})
            if (existingUsername) {
                errorCodes.push(423)
            }

            if (!validator.isEmail(email)) {
                errors.push({ message: 'Email is invalid.'})
                errorCodes.push(424)
            }

            if (
                validator.isEmpty(password) || 
                !validator.isLength(password, { min: 5 })
            ) {
                errors.push({message: 'Password too short'})
                errorCodes.push(425)

            }

            if (errorCodes.length > 0) {
                const error = new Error('Errors exist')
                error.data = errorCodes
                error.code = 456
                throw error
            }

            const dateOfBirth = new Date(dob)
            const hashedPw = await bcrypt.hash(password, 12)

            return await User.create({ username, email: emailLower, password: hashedPw, dob: dateOfBirth})
            .then(user => {
                return {
                    ...user.dataValues
                }
            })
        } catch(err) {
            console.log(err)
            err.statusCode = 500
            return err
        }
    },

    // getUserCountries: async ({ userId }) => {
    //     return await UserCountries.findAll({ where: { userId } })
    // },

    login: async ({ username, password }) => {
        const emailLower = username.toLowerCase()
        try {

            let user = await User.findOne({where: {email: emailLower}})
            if (!user) user = await User.findOne({where: {username}})
            if (!user) {
                const error = new Error('No user found with that username or password.')
                error.code = 401
                throw error
            }
    
            const isEqual = await bcrypt.compare(password, user.password)
            if (!isEqual) {
                const error = new Error('Incorrect Password.')
                error.code = 401
                throw error
            }

            const token = jwt.sign(
                {
                    userId: user.id.toString(),
                    email: user.email,
                }, 
                key,
                // { expiresIn: '1h'}
            )
            const userAge =  calculateAge(user.dob)
            
            return {token, userId: user.id.toString(), username: user.username, age: userAge }
        }
        catch(err) {
            return err
        }

    },

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
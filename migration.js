const sequelize = require('./db/tdDb');
// const Sequelize = require('sequelize')

const addFriendRequestId = async () => {

    // sequelize.query("ALTER TABLE users ADD friendRequestId varchar(255)")
    // return 'column added successfully'

    return 'no data to migrate'
}

module.exports = {
    addFriendRequestId
};

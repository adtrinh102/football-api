const Sequelize = require('sequelize')
const db = require('../db')

const Team = db.define(
    'team', 
    {
        name: {
            type: Sequelize.STRING
        }
    },
    { tableName: 'teams' }
)

module.exports = Team
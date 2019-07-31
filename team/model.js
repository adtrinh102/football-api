const Sequelize = require('sequelize')
const db = require('../db')
const City = require('../city/model')

const Team = db.define(
    'team', 
    {
        name: {
            type: Sequelize.STRING
        }
    },
    { tableName: 'teams', timestamps: false }
)

Team.belongsTo(City)

module.exports = Team
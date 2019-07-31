const Sequelize = require('sequelize')
const db = require('../db')
const Team = require('../team/model')
const City = require('../city/model')

const Player = db.define(
    'player', 
    {
        name: {
            type: Sequelize.STRING
        },
        number: {
            type: Sequelize.INTEGER
        },
    },
    { tableName: 'players', timestamps: false }
)

Player.belongsTo(Team)
Player.belongsTo(City)

module.exports = Player
const Sequelize = require('sequelize')
const db = require('../db')
const Team = require('../team/model')

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

module.exports = Player
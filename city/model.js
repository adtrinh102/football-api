const Sequelize = require('sequelize')
const db = require('../db')

const City = db.define(
    'city', 
    {
        name: {
            type: Sequelize.STRING
        },
        population: {
            type: Sequelize.INTEGER
        },
    },
    { tableName: 'cities', timestamps: false }
)

module.exports = City
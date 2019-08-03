const { Router } = require('express')
const Sequelize = require('sequelize')
const Player = require('./model')
const Team = require('../team/model')
const City = require('../city/model')

const router = new Router()

router.get('/player', (req, res, next) => {
    Player.findAll()
        .then(players => res.json(players))
        .catch(next)
})

router.post('/player', (req, res, next) => {
    // Filter only if request has keys    
    const filters = []
    
    function addFilter (key) {
        if (req.body[key]) {
            filters.push({ [key]: req.body[key] })
        }
    }
    addFilter('name')
    addFilter('number')
    
    // Another way to check, but this way checks all input keys
    // const keys = Object.keys(req.body)
    // const filters = keys.map(key => (({ [key]: req.body[key] })))

    Player.findOne({
        where: {
            [Sequelize.Op.or]: filters
        }
    })
        .then(player => {
            if (player) {
                res.status(409).send("Player's name or player's number has already been defined.")
            }
            else {
                Player.create(req.body)
                    .then(player => res.json(player))
            }
        })
        .catch(next)
})

router.get('/player/:id', (req, res, next) => {
    Player.findByPk(req.params.id, { include: [Team, City] })
        .then(player => res.json(player))
        .catch(next)
})

router.get('/player/team/:teamId', (req, res, next) => {
    Player.findAll({
        where: {
            teamId: req.params.teamId
        }
    })
        .then(players => res.json(players))
        .catch(next)
})

router.put('/player/:id', (req, res, next) => {
    Player.findByPk(req.params.id)
        .then(player => player.update(req.body))
        .then(player => res.json(player))
        .catch(next)
})

router.delete('/player', (req, res, next) => {
    Player.destroy({
        where: {}
    })
        .then(numDeleted => {
            if (numDeleted) {
                res.status(204).end()
            }
            res.status(404).end()
        })
        .catch(next)
})

router.delete('/player/:id', (req, res, next) => {
    Player.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(numDeleted => {
            if (numDeleted) {
                res.status(204).end()
            }
            res.status(404).end()
        })
        .catch(next)
})

module.exports = router
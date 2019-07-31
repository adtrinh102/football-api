const { Router } = require('express')
const Player = require('./model')
const Team = require('../team/model')

const router = new Router()

router.get('/player', (req, res, next) => {
    Player.findAll()
        .then(players => res.json(players))
        .catch(next)
})

router.post('/player', (req, res, next) => {
    Player.create(req.body)
        .then(player => res.json(player))
        .catch(next)
})

router.get('/player/:id', (req, res, next) => {
    Player.findByPk(req.params.id, { include: [Team] })
        .then(player => res.json(player))
        .catch(next)
})

router.put('/player/:id', (req, res, next) => {
    Player.findByPk(req.params.id)
        .then(player => player.update(req.body))
        .then(player => res.json(player))
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
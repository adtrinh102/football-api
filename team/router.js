const { Router } = require('express')
const Sequelize = require('sequelize')
const Team = require('./model')
const City = require('../city/model')

const router = new Router()

router.get('/team', (req, res, next) => {
    Team.findAll()
        .then(teams => res.json(teams))
        .catch(next)
})

router.post('/team', (req, res, next) => {
    Team.findOne({
        where: {
            name: req.body.name
        }
    })
        .then(team => {
            if (team) {
                return res.status(409).send("Team's name has already been defined.")
            }
            else {
                Team.create(req.body)
                    .then(team => res.json(team))
            }
        })
        .catch(next)
})

router.get('/team/:id', (req, res, next) => {
    Team.findByPk(req.params.id, { include: [City] })
        .then(team => {
            if (!team) {
                return res.status(404).end()
            }
            else {
                res.json(team)
            }
        })
        .catch(next)
})

router.put('/team/:id', (req, res, next) => {
    Team.findByPk(req.params.id)
        .then(team => {
            if (!team) {
                return res.status(404).end()
            }
            else {
                team.update(req.body)
                    .then(team => res.json(team))
            }
        })
        .catch(next)
})

router.delete('/team', (req, res, next) => {
    Team.destroy({
        where: {}
    })
        .then(numDeleted => {
            if (numDeleted) {
                return res.status(204).end()
            }
            return res.status(404).end()
        })
        .catch(next)
})

router.delete('/team/:id', (req, res, next) => {
    Team.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(numDeleted => {
            if (numDeleted) {
                return res.status(204).end()
            }
            return res.status(404).end()
        })
        .catch(next)
})

module.exports = router
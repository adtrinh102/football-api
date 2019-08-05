const { Router } = require('express')
const City = require('./model')

const router = new Router()

router.get('/city', (req, res, next) => {
    City.findAll()
        .then(cities => res.json(cities))
        .catch(next)
})

router.post('/city', (req, res, next) => {
    City.findOne({
        where: {
            name: req.body.name
        }
    })
        .then(city => {
            if (city) {
                return res.status(409).send("City's name has already been defined.")
            }
            else {
                City.create(req.body)
                    .then(city => res.json(city))
            }
        })
        .catch(next)
})

router.get('/city/:id', (req, res, next) => {
    City.findByPk(req.params.id)
        .then(city => res.json(city))
        .catch(next)
})

router.put('/city/:id', (req, res, next) => {
    City.findByPk(req.params.id)
        .then(city => city.update(req.body))
        .then(city => res.json(city))
        .catch(next)
})

router.delete('/city', (req, res, next) => {
    City.destroy({
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

router.delete('/city/:id', (req, res, next) => {
    City.destroy({
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
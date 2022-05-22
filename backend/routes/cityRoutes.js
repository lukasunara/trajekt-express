const express = require('express');
const cityController = require('../controllers/cityController')
const router = express.Router();

router.get('/getAll', (req, res, next) => {
    return cityController.getAllCities().then((cities) => {
        res.json(cities).end()
    }).catch((e) => {
        console.error(e)
        res.status(500).send(e.message)
    })
})

module.exports = router
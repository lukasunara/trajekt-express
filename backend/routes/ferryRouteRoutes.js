const express = require('express');
const ferryRouteController = require('../controllers/ferryRouteController')
const router = express.Router();

router.get('/getAll', (req, res, next) => {
    return ferryRouteController.getAll().then((ferryRoute) => {
        res.json(ferryRoute).end()
    }).catch((e) => {
        console.error(e)
        res.status(500).send(e.message)
    })
})

module.exports = router
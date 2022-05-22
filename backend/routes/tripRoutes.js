const express = require('express');
const tripController = require('../controllers/tripController')
const tripRouteController = require('../controllers/tripRouteController')
const router = express.Router();

router.get('/getAll', (req, res, next) => {
    return tripController.getAllTrips().then((trips) => {
        res.json(trips).end()
    }).catch((e) => {
        console.error(e)
        res.status(500).send(e.message)
    })
})

router.get('/getByCities', (req, res, next) => {
    let departureCity = req.body.departureCityName
    return tripController.getTripsByCities(departureCity)
        .then((trips) => {
            res.json(trips).end()
        }).catch((e) => {
            console.error(e)
            res.status(500).send(e.message)
        })
})

router.get('/getByDepartureDate', (req, res, next) => {
    let departureDate = new Date(req.body.departureDate)
    return tripController.getTripsByDepartureDate(departureDate)
        .then((trips) => {
            res.json(trips).end()
        }).catch((e) => {
            console.error(e)
            res.status(500).send(e.message)
        })
})

router.post('/createTrip', (req, res, next) => {
    let price = req.body.price
    let departureTime = req.body.departureTime
    let arrivalTime = req.body.arrivalTime
    let routeId = req.body.routeId

    if (price !== undefined && departureTime !== undefined &&
        arrivalTime !== undefined && routeId !== undefined
    ) {
        return tripController.createTrip(price, departureTime, arrivalTime).then((trip) => {
            tripRouteController.createTripRoute(trip.tripId, routeId)
            res.status(204).end()
        }).catch((e) => {
            console.error(e)
            res.status(500).send(e.message)
        })
    } else {
        res.status(400).send("Missing some parameters")
    }
})

router.put("/updateTrip/:tripId", (req, res, next) => {
    let tripId = req.params.tripId
    let updatedDepartureTime = req.body.departureTime
    let updatedArrivalTime = req.body.arrivalTime
    let updatedRouteId = req.body.routeId

    if (tripId !== undefined && updatedDepartureTime !== undefined &&
        updatedArrivalTime !== undefined && updatedRouteId !== undefined) {
        tripController.updateTrip(tripId, updatedDepartureTime, updatedArrivalTime, updatedRouteId)
            .then((trip) => {
                tripRouteController.createTripRoute(tripId, updatedRouteId)
                res.status(204).end()
            }).catch((e) => {
                console.error(e)
                res.status(500).send(e.message)
            })
    } else {
        res.status(400).send("Missing some parameters")
    }
})

router.delete('/delete:tripId', (req, res, next) => {
    tripController.deleteTrip(req.params.tripId).then(() => {
        res.status(204).end()
    }).catch((e) => {
        res.status(500).send(e.message)
    })
})

module.exports = router;

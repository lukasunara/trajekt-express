class FerryRoute {
    constructor(routeId, destinationPostalNumber, departurePostalNumber, travelCompanyId, ferryId) {
        this.routeId = routeId
        this.destinationPostalNumber = destinationPostalNumber
        this.departurePostalNumber = departurePostalNumber
        this.travelCompanyId = travelCompanyId
        this.ferryId = ferryId
    }
}

module.exports = FerryRoute
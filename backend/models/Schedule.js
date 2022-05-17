class Schedule {
    constructor(scheduleId, departureTime, arrivalTime) {
        this.scheduleId = scheduleId
        this.departureTime = departureTime
        this.arrivalTime = arrivalTime
        this.duration = this.diffHours(departureTime, arrivalTime)
    }

    diffHours = (dateTime1, dateTime2) => {
        let diff = (dateTime2.getTime() - dateTime1.getTime()) / 1000 / 60 / 60
        let diffDateTime = new Date(Math.abs(Math.round(diff)))
        return `${diffDateTime.getHours()}h ${diffDateTime.getMinutes()}min`
    }
}

module.exports = Schedule
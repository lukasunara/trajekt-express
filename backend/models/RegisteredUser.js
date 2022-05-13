class RegisteredUser {
    constructor(userId, email, password, address, postalNumber) {
        this.userId = userId
        this.email = email
        this.password = password
        this.address = address
        this.postalNumber = postalNumber
    }
}

module.exports = RegisteredUser
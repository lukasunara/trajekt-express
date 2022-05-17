const { Pool } = require("pg");

// created connection pool with the database
const pool = new Pool({
    user: 'postgres', // here should be postgres or name of user which has access to database 
    host: 'localhost', // here should be localhost
    database: 'TrajektExpress', // here comes database name
    password: 'bazepodataka', // here comes database password
    port: 5432,
});

const sql_drop_tables = `
    DROP TABLE IF EXISTS TripRoute;
    DROP TABLE IF EXISTS Ticket;
    DROP TABLE IF EXISTS FerryRoute;
    DROP TABLE IF EXISTS Traveler;
    DROP TABLE IF EXISTS TravelCompany;
    DROP TABLE IF EXISTS RegisteredUser;
    DROP TABLE IF EXISTS City;
    DROP TABLE IF EXISTS Trip;
    DROP TABLE IF EXISTS Country;
    DROP TABLE IF EXISTS Ferry;
    DROP TABLE IF EXISTS Schedule;
`;

const sql_create_schedule = `CREATE TABLE Schedule(
    scheduleId SERIAL PRIMARY KEY,
    departureTime TIMESTAMP NOT NULL,
    arrivalTime TIMESTAMP NOT NULL
);`;
const sql_create_schedule_id_index = `CREATE UNIQUE INDEX idx_scheduleId ON Schedule(scheduleId);`;

const sql_create_ferry = `CREATE TABLE Ferry(
    ferryId SERIAL PRIMARY KEY,
    name VARCHAR(100),
    capacity INT NOT NULL,
    canTransportVehicles BOOLEAN
);`;
const sql_create_ferry_id_index = `CREATE UNIQUE INDEX idx_ferryId ON Ferry(ferryId);`;

const sql_create_country = `CREATE TABLE Country(
    countryCode VARCHAR(3) PRIMARY KEY,
    name VARCHAR(200) NOT NULL UNIQUE
);`;
const sql_create_country_id_index = `CREATE UNIQUE INDEX idx_countryId ON Country(countryCode);`;
const sql_create_country_name_index = `CREATE UNIQUE INDEX idx_countryName ON Country(name);`;

const sql_create_trip = `CREATE TABLE Trip(
    tripId SERIAL PRIMARY KEY,
    price NUMERIC(10, 2) NOT NULL,
    scheduleId INT NOT NULL,
    FOREIGN KEY (scheduleId) REFERENCES Schedule(scheduleId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);`;
const sql_create_trip_id_index = `CREATE UNIQUE INDEX idx_tripId ON Trip(tripId);`;
const sql_create_trip_schedule_index = `CREATE INDEX idx_tripSchedule ON Trip(scheduleId);`;

const sql_create_city = `CREATE TABLE City(
    postalNumber VARCHAR(10) PRIMARY KEY,
    name VARCHAR(300) NOT NULL,
    countryCode VARCHAR(3) NOT NULL,
    FOREIGN KEY (countryCode) REFERENCES Country(countryCode)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);`;
const sql_create_city_id_index = `CREATE UNIQUE INDEX idx_cityId ON City(postalNumber);`;
const sql_create_city_country_index = `CREATE INDEX idx_cityCountry ON City(countryCode);`;

const sql_create_registeredUser = `CREATE TABLE RegisteredUser(
    userId SERIAL PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(32) NOT NULL,
    address VARCHAR(300),
    postalNumber VARCHAR(10),
    FOREIGN KEY (postalNumber) REFERENCES City(postalNumber)
        ON DELETE SET NULL
        ON UPDATE CASCADE
);`;
const sql_create_registeredUser_id_index = `CREATE UNIQUE INDEX idx_registeredUserId ON RegisteredUser(userId);`;
const sql_create_registeredUser_city_index = `CREATE INDEX idx_registeredUserCity ON RegisteredUser(postalNumber);`;

const sql_create_travelCompany = `CREATE TABLE TravelCompany(
    travelCompanyId INT PRIMARY KEY,
    CID VARCHAR(24) NOT NULL UNIQUE,
    name VARCHAR(300) NOT NULL,
    FOREIGN KEY (travelCompanyId) REFERENCES RegisteredUser(userId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);`;
const sql_create_travelCompany_id_index = `CREATE UNIQUE INDEX idx_travelCompanyId ON TravelCompany(travelCompanyId);`;
const sql_create_travelCompany_registeredUser_index = `CREATE INDEX idx_travelCompanyRegisteredUser ON TravelCompany(travelCompanyId);`;

const sql_create_traveler = `CREATE TABLE Traveler(
    travelerId INT PRIMARY KEY,
    firstName VARCHAR(200) NOT NULL,
    lastName VARCHAR(200) NOT NULL,
    age INT,
    FOREIGN KEY (travelerId) REFERENCES RegisteredUser(userId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);`;
const sql_create_traveler_id_index = `CREATE UNIQUE INDEX idx_travelerId ON Traveler(travelerId);`;
const sql_create_traveler_registeredUser_index = `CREATE INDEX idx_travelerRegisteredUser ON Traveler(travelerId);`;

const sql_create_ferryRoute = `CREATE TABLE FerryRoute(
    routeId SERIAL PRIMARY KEY,
    destinationPostalNumber VARCHAR(10) NOT NULL,
    departurePostalNumber VARCHAR(10) NOT NULL,
    travelCompanyId INT NOT NULL,
    ferryId INT NOT NULL,
    FOREIGN KEY (destinationPostalNumber) REFERENCES City(postalNumber)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (departurePostalNumber) REFERENCES City(postalNumber)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (travelCompanyId) REFERENCES TravelCompany(travelCompanyId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (ferryId) REFERENCES Ferry(ferryId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);`;
const sql_create_ferryRoute_id_index = `CREATE UNIQUE INDEX idx_ferryRouteId ON FerryRoute(routeId);`;
const sql_create_ferryRoute_destinationCity_index = `CREATE INDEX idx_ferryRouteDestinationCity ON FerryRoute(destinationPostalNumber);`;
const sql_create_ferryRoute_departureCity_index = `CREATE INDEX idx_ferryRouteDepartureCity ON FerryRoute(departurePostalNumber);`;
const sql_create_ferryRoute_travelCompany_index = `CREATE INDEX idx_ferryRouteTravelCompany ON FerryRoute(travelCompanyId);`;
const sql_create_ferryRoute_ferryId_index = `CREATE INDEX idx_ferryRouteFerry ON FerryRoute(ferryId);`;

const sql_create_ticket = `CREATE TABLE Ticket(
    ticketId SERIAL PRIMARY KEY,
    travelerId INT NOT NULL,
    tripId INT NOT NULL,
    FOREIGN KEY (travelerId) REFERENCES Traveler(travelerId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (tripId) REFERENCES Trip(tripId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);`;
const sql_create_ticket_id_index = `CREATE UNIQUE INDEX idx_ticketId ON Ticket(ticketId);`;
const sql_create_ticket_traveler_index = `CREATE INDEX idx_ticketTraveler ON Ticket(travelerId);`;
const sql_create_ticket_trip_index = `CREATE INDEX idx_ticketTrip ON Ticket(tripId);`;

const sql_create_tripRoute = `CREATE TABLE TripRoute(
    tripId INT NOT NULL,
    routeId INT NOT NULL,
    PRIMARY KEY (tripId, routeId),
    FOREIGN KEY (tripId) REFERENCES Trip(tripId)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (routeId) REFERENCES FerryRoute(routeId)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);`;
const sql_create_tripRoute_id_index = `CREATE UNIQUE INDEX idx_tripRouteId ON TripRoute(tripId, routeId);`;
const sql_create_tripRoute_trip_index = `CREATE INDEX idx_tripRouteTrip ON TripRoute(tripId);`;
const sql_create_tripRoute_ferryRoute_index = `CREATE INDEX idx_tripRouteFerryRoute ON TripRoute(routeId);`;

const sql_insert_schedule = `
INSERT INTO Schedule(departureTime, arrivalTime) VALUES
    (timestamp '2022-04-05 13:00:00', timestamp '2022-04-05 14:56:00'),
    (timestamp '2022-04-06 12:00:00', timestamp '2022-04-06 13:45:00'),
    (timestamp '2022-04-07 06:00:00', timestamp '2022-04-07 06:20:00'),
    (timestamp '2022-04-08 10:00:00', timestamp '2022-04-08 11:32:00'),
    (timestamp '2022-04-08 08:00:00', timestamp '2022-04-08 09:40:00'),
    (timestamp '2022-04-09 09:00:00', timestamp '2022-04-09 10:12:00'),
    (timestamp '2022-04-09 11:00:00', timestamp '2022-04-09 12:43:00'),
    (timestamp '2022-04-12 17:00:00', timestamp '2022-04-12 17:28:00'),
    (timestamp '2022-04-22 14:00:00', timestamp '2022-04-22 15:44:00'),
    (timestamp '2022-04-23 18:00:00', timestamp '2022-04-23 18:29:00'),
    (timestamp '2022-04-23 19:00:00', timestamp '2022-04-23 19:22:00'),
    (timestamp '2022-04-29 15:00:00', timestamp '2022-04-29 16:11:00'),
    (timestamp '2022-04-29 20:00:00', timestamp '2022-04-29 20:21:00'),
    (timestamp '2022-04-29 21:00:00', timestamp '2022-04-29 21:34:00'),
    (timestamp '2022-04-29 22:00:00', timestamp '2022-04-29 22:19:00'),
    (timestamp '2022-04-30 16:00:00', timestamp '2022-04-30 17:25:00');
`;

const sql_insert_ferry = `
INSERT INTO Ferry(name, capacity, canTransportVehicles) VALUES
    ('Bartol Kašić', 554, true),
    ('Biokovo', 1338, true),
    ('Brač', 761, true),
    ('Dubrovnik', 1584, true),
    ('Hrvat', 1338, true),
    ('Jadran', 1338, true),
    ('Juraj Dalmatinac', 1338, true),
    ('Lastovo', 560, true),
    ('Vladimir Nazor', 520, true),
    ('Zadar', 1385, true),
    ('Brač', 761, true),
    ('Adriana', 356, false),
    ('Dora', 350, false),
    ('Dubravka', 306, false),
    ('Jelena', 403, false),
    ('Novalja', 324, false),
    ('Vida', 304, false);
`;

const sql_insert_country = `
INSERT INTO Country(countryCode, name) VALUES
    ('HRV', 'Hrvatska'),
    ('ITA', 'Italija'),
    ('ALB', 'Albanija'),
    ('BRA', 'Brazil'),
    ('ESP', 'Španjolska');
`;

const sql_insert_trip = `
INSERT INTO Trip(price, scheduleId) VALUES
    (16.00, 1),
    (18.00, 2),
    (20.00, 3),
    (22.00, 4),
    (24.00, 5),
    (26.00, 6),
    (28.00, 7),
    (30.00, 8),
    (32.00, 9),
    (34.00, 10),
    (33.00, 11),
    (31.00, 12),
    (50.00, 13),
    (55.00, 14),
    (100.30, 15),
    (13.00, 16);
`;

const sql_insert_city = `
INSERT INTO City(postalNumber, name, countryCode) VALUES
    ('10000', 'Zagreb', 'HRV'),
    ('23000', 'Zadar', 'HRV'),
    ('23272', 'Kali', 'HRV'),
    ('00100', 'Rim', 'ITA'),
    ('51000', 'Rijeka', 'HRV'),
    ('51280', 'Rab', 'HRV'),
    ('53291', 'Novalja', 'HRV'),
    ('23273', 'Preko', 'HRV'),
    ('51557', 'Cres', 'HRV'),
    ('51552', 'Ilovik', 'HRV'),
    ('51550', 'Mali Lošinj', 'HRV'),
    ('21480', 'Vis', 'HRV'),
    ('21000', 'Split', 'HRV'),
    ('23293', 'Ist', 'HRV'),
    ('23292', 'Molat', 'HRV'),
    ('21420', 'Bol', 'HRV'),
    ('20270', 'Vela Luka', 'HRV'),
    ('21430', 'Rogač', 'HRV'),
    ('23285', 'Brbinj', 'HRV'),
    ('60121', 'Ancona', 'ITA'),
    ('21400', 'Supetar', 'HRV'),
    ('21460', 'Stari Grad', 'HRV'),
    ('23294', 'Silba', 'HRV');
`;

const sql_insert_registeredUser = `
INSERT INTO RegisteredUser(email, password, address, postalNumber) VALUES
    ('pero.peric@fer.hr', '12345', 'Trg bana Josipa Jelačića', '10000'),
    ('luka.lukic@fer.hr', 'lozinka', 'Maksimir 13', '10000'),
    ('ana.anic@fer.hr', 'anicakabanica', 'Zadarska Riva 123', '23000'),
    ('sime.simic@fer.hr', 'karta', 'Peti Maj', '51000'),
    ('karlo.karlic@fer.hr', 'hrvatska', 'Dom sportova', '10000'),
    ('jadrolinija@gmail.com', 'jadrolinija', 'Riva 16', '51000'),
    ('italy.tours@gmail.com', 'tours', 'Rimska ulica 13', '00100');
`;

const sql_insert_travelCompany = `
INSERT INTO TravelCompany(travelCompanyId, CID, name) VALUES
    (6, '38453148181', 'Jadrolinija'),
    (7, '12345678922', 'Italy Tours');
`;

const sql_insert_traveler = `
INSERT INTO Traveler(travelerId, firstName, lastName, age) VALUES
    (1, 'Pero', 'Perić', 22),
    (2, 'Luka', 'Lukić', 23),
    (3, 'Ana', 'Anić', 24),
    (4, 'Šime', 'Šimić', 25),
    (5, 'Karlo', 'Karlić', 26);
`;

const sql_insert_ferryRoute = `
INSERT INTO FerryRoute(destinationPostalNumber, departurePostalNumber, travelCompanyId, ferryId) VALUES
    ('23000', '23273', 6, 13),
    ('23273', '23000', 6, 13),
    ('23000', '23293', 6, 16),
    ('23293', '23000', 6, 16),
    ('21000', '21400', 6, 7),
    ('21400', '21000', 6, 7),
    ('60121', '21000', 7, 4),
    ('21000', '60121', 7, 4),
    ('51000', '51557', 6, 14),
    ('51557', '51000', 6, 14),
    ('21000', '21480', 6, 15),
    ('21480', '21000', 6, 15),
    ('23294', '51550', 6, 9),
    ('51550', '23294', 6, 9),
    ('51000', '51280', 6, 12),
    ('51280', '51000', 6, 12),
    ('21000', '21420', 6, 17),
    ('21420', '21000', 6, 17),
    ('20270', '21000', 6, 8),
    ('21000', '20270', 6, 8),
    ('23285', '23000', 6, 3),
    ('23000', '23285', 6, 3);
`;

const sql_insert_ticket = `
INSERT INTO Ticket(travelerId, tripId) VALUES
    (1, 1),
    (2, 3),
    (3, 6),
    (4, 9),
    (5, 12),
    (1, 2),
    (2, 5),
    (3, 7),
    (4, 8),
    (5, 15);
`;

const sql_insert_tripRoute = `
INSERT INTO TripRoute (routeId, tripId) VALUES
    (1, 4),
    (3, 5),
    (5, 6),
    (7, 15),
    (9, 8),
    (11, 9),
    (13, 7),
    (15, 10),
    (17, 11),
    (19, 2),
    (21, 3);
`;

let table_names = [
    'Schedule',
    'Ferry',
    'Country',
    'Trip',
    'City',
    'RegisteredUser',
    'TravelCompany',
    'Traveler',
    'FerryRoute',
    'Ticket',
    'TripRoute',
];

let tables = [
    sql_create_schedule,
    sql_create_ferry,
    sql_create_country,
    sql_create_trip,
    sql_create_city,
    sql_create_registeredUser,
    sql_create_travelCompany,
    sql_create_traveler,
    sql_create_ferryRoute,
    sql_create_ticket,
    sql_create_tripRoute,
];

let indexes = [
    sql_create_schedule_id_index,
    sql_create_ferry_id_index,
    sql_create_country_id_index,
    sql_create_country_name_index,
    sql_create_trip_id_index,
    sql_create_trip_schedule_index,
    sql_create_city_id_index,
    sql_create_city_country_index,
    sql_create_registeredUser_id_index,
    sql_create_registeredUser_city_index,
    sql_create_travelCompany_id_index,
    sql_create_travelCompany_registeredUser_index,
    sql_create_traveler_id_index,
    sql_create_traveler_registeredUser_index,
    sql_create_ferryRoute_id_index,
    sql_create_ferryRoute_ferryId_index,
    sql_create_ferryRoute_departureCity_index,
    sql_create_ferryRoute_travelCompany_index,
    sql_create_ferryRoute_destinationCity_index,
    sql_create_ticket_id_index,
    sql_create_ticket_trip_index,
    sql_create_ticket_traveler_index,
    sql_create_tripRoute_id_index,
    sql_create_tripRoute_trip_index,
    sql_create_tripRoute_ferryRoute_index,
];

let inserts = [
    sql_insert_schedule,
    sql_insert_ferry,
    sql_insert_country,
    sql_insert_trip,
    sql_insert_city,
    sql_insert_registeredUser,
    sql_insert_travelCompany,
    sql_insert_traveler,
    sql_insert_ferryRoute,
    sql_insert_ticket,
    sql_insert_tripRoute,
];

// drop existing tables, create new tables and populate with data (if provided) 
(async () => {
    console.log('Dropping all existing tables...');
    try {
        await pool.query(sql_drop_tables, []);
    } catch (err) {
        console.log('Error while dropping tables.');
        return console.log(err.message);
    }

    console.log('Creating tables');
    for (let i = 0; i < tables.length; i++) {
        console.log('Creating table ' + table_names[i] + '.');
        try {
            await pool.query(tables[i], []);
            console.log('Successfully created table ' + table_names[i] + ' .');
        } catch (err) {
            console.log('Error creating table ' + table_names[i]);
            return console.log(err.message);
        }
    }

    console.log('Creating indexes');
    for (let i = 0; i < indexes.length; i++) {
        try {
            await pool.query(indexes[i], []);
            console.log('Successfully created index ' + i + ' .');
        } catch (err) {
            console.log('Error creating index ' + i + '.');
            return console.log(err.message);
        }
    }

    console.log('Inserting into tables');
    for (let i = 0; i < tables.length; i++) {
        console.log('Inserting into ' + table_names[i] + '.');
        try {
            await pool.query(inserts[i], []);
            console.log('Successfully inserted into ' + table_names[i] + ' .');
        } catch (err) {
            console.log('Error inserting into table ' + table_names[i]);
            return console.log(err.message);
        }
    }
})();

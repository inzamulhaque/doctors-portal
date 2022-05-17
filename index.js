const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7kpjj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

function verifyJWT(req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).send({ message: 'UnAuthorized Access' });
    }

    const token = authorization.split(" ")[1];

    jwt.verify(token, process.env.TOKEN_KEY, function (err, decoded) {
        if (err) {
            return res.status(403).send({ message: 'Forbidden Access' })
        }
        req.decoded = decoded;
        next();
    });

}

async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db("doctor_portal").collection("services");
        const bookingCollection = client.db("doctor_portal").collection("bookings");
        const userCollection = client.db("doctor_portal").collection("users");

        app.get("/service", async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

        app.get("/user", verifyJWT, async (req, res) => {
            const users = await userCollection.find().toArray();
            res.send(users);
        });

        app.get("/admin/:email", async (req, res) => {
            const email = req.params.email;
            const user = await userCollection.findOne({ email });
            const isAdmin = user.role === "admin";
            res.send({ admin: isAdmin });
        });

        app.put("/user/admin/:email", verifyJWT, async (req, res) => {
            const email = req.params.email;
            const requester = req.decoded.email;
            const requesterAccount = await userCollection.findOne({ email: requester });
            if (requesterAccount.role === "admin") {
                const filter = { email };
                const updatedDocs = {
                    $set: { role: "admin" },
                };
                const result = await userCollection.updateOne(filter, updatedDocs);
                res.send(result);
            } else {
                res.status(403).send({ message: 'forbidden' });
            }
        });

        app.put("/user/:email", async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            const filter = { email };
            const option = { upsert: true };
            const updatedDocs = {
                $set: user,
            };
            const result = await userCollection.updateOne(filter, updatedDocs, option);
            const token = jwt.sign({ email }, process.env.TOKEN_KEY, { expiresIn: '1h' });
            res.send({ result, token });
        });

        app.post("/booking", async (req, res) => {
            const booking = req.body;
            const query = { treatment: booking.treatment, date: booking.date, patient: booking.patient };
            const exixts = await bookingCollection.findOne(query);
            if (exixts) {
                return res.send({ success: false, booking: exixts });
            }
            const result = await bookingCollection.insertOne(booking);
            res.send({ success: true, result });
        });

        app.get("/available", async (req, res) => {
            const date = req.query.date;

            // 1: get all services
            const services = await serviceCollection.find().toArray();

            // 2: get the booking of that day
            const query = { date: date };
            const bookings = await bookingCollection.find(query).toArray();

            // 3: for each serevice, find booking for that service
            services.forEach(service => {
                const serviceBookings = bookings.filter(book => book.treatment === service.name);

                // const booked = serviceBookings.map(s => s.slot);
                // service.booked = booked;
                // service.booked = serviceBookings.map(s => s.slot);

                const booked = serviceBookings.map(service => service.slot);

                const available = service.slots.filter(slot => !booked.includes(slot));
                // service.available = available;

                service.slots = available;
            });

            res.send(services);
        });

        app.get("/booking", verifyJWT, async (req, res) => {
            const patient = req.query.patient;
            const decodedEmail = req.decoded.email;
            if (patient === decodedEmail) {
                const query = { patient };
                const bookings = await bookingCollection.find(query).toArray();
                res.send(bookings);
            } else {
                return res.status(403).send({ message: 'forbidden access' });
            }
        });

    } finally {

    }
}

run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Server Running");
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
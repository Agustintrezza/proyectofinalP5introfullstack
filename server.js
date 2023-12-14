const express = require('express');
const app = express();
const dotenv = require('dotenv')

const router = express.Router();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const usersRouter = require('./routes/users.js');
const RecyclingRouter = require('./routes/recycling.js');
const planetsRouter = require('./routes/planets');
const composersRouter = require('./routes/composers');
const cocktailsRouter = require('./routes/cocktails');
const yogaRouter = require('./routes/yoga');

const stripe = require('stripe')('sk_test_51MpcnREFbtwHkKNRH6otmFgmIxUQR8k0y7gQyJatb71LanFGlJjhJGgt3LdX2i437H32i1DyFe7SJNF6fMgR0KCk00Rm9Rkgqw');

dotenv.config()

app.use(express.json());
app.use(router);
app.use(express.static(path.join(__dirname, 'public')))
app.use("/health", (req, res) => res.sendStatus(200));
// Habilita CORS para todas las rutas
app.use(cors());

app.use('/recycling', RecyclingRouter);
app.use('/yoga', yogaRouter);
app.use('/cocktails', cocktailsRouter);
app.use('/composers', composersRouter);
app.use('/planets', planetsRouter);
app.use('/users', usersRouter);

async function connectToMongo() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        app.listen(process.env.PORT, () => {
            console.log('Conectado a la base de datos. Servidor corriendo en el puerto http://localhost:' + process.env.PORT)
        })
    } catch(error) {
        console.log('error', error)
    }
}




connectToMongo();
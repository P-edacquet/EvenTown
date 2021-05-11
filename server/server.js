require('dotenv').config();
const express = require('express');
const connectToDB = require('./database/db');
const ErrorsMiddleware = require('./middleware/errorMiddleware');
const PinError = require('./utils/PinError');
const pinRoutes = require('./routes/pinRoutes');

process.on("uncaughtException", (error) => {
    console.log("Uncaught Exception..... stopping the server....");
    console.log(error.name, error.message);
    process.exit(1);
});


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
connectToDB();

//Routes
app.get('/test', (req, res) => {
    res.json({
        Hi: "Welcome"
    });
});

app.use('/api/v1/pins', pinRoutes);

//Errors on routes using Error middleware
app.all("*", ((req, res, next) => {
    next(new PinError(`Can't find ${req.originalUrl} on this server!`, 404));
}));
app.use(ErrorsMiddleware);

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);


process.on("unhandledRejection", (error) => {
    console.log("unhandledRejection..... stopping the server....");
    console.log(error.name, error.message);
    server.close(() => {
        process.exit(1);
    });
});
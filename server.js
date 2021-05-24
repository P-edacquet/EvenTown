require('dotenv').config();
const express = require('express');
const connectToDB = require('./database/db');
const ErrorsMiddleware = require('./middleware/errorMiddleware');
const PinError = require('./utils/PinError');
const pinRoutes = require('./routes/pinRoutes');




const app = express();
app.use(express.json());

app.use(express.static(__dirname + '/client/build'));

const PORT = process.env.PORT || 80;
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


const mongoose = require('mongoose');

const connectToDb = async () => {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
        authSource: "admin",
        auth: {
            user: 'm_costa3',
            password: '9ufKF.n93Z<^',
        },
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    console.log(`MongoDB connected: ${connect.connection.host}`);
}

module.exports = connectToDb;
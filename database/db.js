const mongoose = require('mongoose');

const connectToDb = async () => {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
        authSource: "admin",
        auth: {
            user: process.env.MONGO_USER,
            password: process.env.MONGO_PASSWORD,
        },
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    console.log(`MongoDB connected: ${connect.connection.host}`);
}

module.exports = connectToDb;
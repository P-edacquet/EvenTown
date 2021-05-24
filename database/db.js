const mongoose = require('mongoose');

const connectToDb = async () => {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
        authSource: "admin",
        auth: {
            user: 'atlasAdmin',
            password: 'p!nucYrHQWW3jc3',
        },
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    console.log(`MongoDB connected: ${connect.connection.host}`);
}

module.exports = connectToDb;
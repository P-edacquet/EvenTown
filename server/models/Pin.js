const mongoose = require('mongoose');

const PinSchema = new mongoose.Schema({
        title: {
            type: String,
            require: [true, "Entrez un titre"],
            min: 3,
            unique: true,
            trim: true,
            maxlength: [50, "Le titre ne peut dépasser 50 caractères"]
        },
        desc: {
            type: String,
            require: [true, "Entrez une description"],
            trim: true,
            min: 3,
            maxlength: [500, "Le titre ne peut dépasser 500 caractères"]
        },
        lat: {
            type: Number,
            require: true,
        },
        long: {
            type: Number,
            require: true,
        },
    }, {
        timestamps: true
    }
);

module.exports = mongoose.model("Pin", PinSchema);
const mongoose = require('mongoose');

// Creem l'esquema de la col·lecció de pel·lícules amb algunes validacions
let moviesSchema = new mongoose.Schema({
    id: String,
    title: {
        type: String,
        required: [true, "El títol és obligatori"],
    },
    year: {
        type: Number,
        min: [1900, "Any massa antic"],
        max: [2024, "Any massa llunyà"],
    },
    director: String,
    duration: {
        type: Number,
        min: [1,"Duració massa curta"],
    },
    genre: [String],
    rate: {
        type: Number,
        min: 0,
        max: 10,
        default: 5,
    },
    poster: String
});

let Movie = mongoose.model('Movies', moviesSchema);

module.exports = Movie;
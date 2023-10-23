const mongoose = require('mongoose')

let llibreSchema = new mongoose.Schema({
    titol: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    editorial: {
        type: String,
        trim: true,
    },
    preu: {
        type: Number,
        required: true,
        min: 0,
    }
});


let Llibre = mongoose.model('llibres', llibreSchema);

module.exports = Llibre;
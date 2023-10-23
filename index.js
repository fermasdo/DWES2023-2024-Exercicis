const mongoose = require("mongoose");
const Llibre = require(__dirname + "/models/llibre.js");

// Local MongoDB connection
mongoose
  .connect(
    'mongodb://root:example@127.0.0.1:27017/llibres?authSource=admin',
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to MongoDB Local!'))
  .catch(err => console.log(err))


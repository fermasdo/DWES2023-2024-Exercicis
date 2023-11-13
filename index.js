// Importar mòduls de tercers
const express = require("express");
const cors = require('cors')
const mongoose = require("mongoose");
const nunjucks = require("nunjucks");
const dotenv = require('dotenv').config()

// Importar mòduls propis
const moviesRouterAPI = require('./routes/moviesAPI.js')
const moviesRouterView = require('./routes/moviesView.js')
const usersRouterAPI = require('./routes/usersAPI.js')

// Constants
const PORT = process.env.PORT || 3000;

// Crear l'aplicació Express
const app = express();

// Serveix arxius estàtics des de la carpeta "public" (CSS propi)
app.use(express.static(__dirname + '/public'));
// Serveix arxius estàtics Bootstrap instal·lat amb NPM
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

// Configuració de Nunjucks
app.set("view engine", "njk");

nunjucks.configure("views", {
  autoescape: true, 
  express: app, 
});

// Connexió a MongoDB
const urlMongoDB = process.env.MONGODB_URI

mongoose.connect(urlMongoDB
  ).then(() => {
    console.log('Connected to MongoDB')
  }).catch((error) => {
    console.log('Error connecting to MongoDB', error)
  })

// Middleware JSON body parser
app.use(express.json());

// Analisi de dades enviades a través de formularis HTML
app.use(express.urlencoded({ extended: true }));

// Middleware CORS, evita errors de CORS (Cross-Origin Resource Sharing)
app.use(cors())


// Tots els endpoints de /movies
app.use('/api/movies', moviesRouterAPI) // Versió API RESTful

app.use('/api/users', usersRouterAPI)

app.use('/movies', moviesRouterView)  // Versió amb Vistes

// Home
app.get('/', (req, res) => {
  res.render('benvinguda.njk')  
})

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});

const express = require("express");
const z = require('zod')
const cors = require('cors')

const { validateMovie, validatePartialMovie } = require('./schemas/movies') 

// Necessari per generar un id únic
const crypto = require("crypto");

const app = express();

const PORT = 3000;

const movies = require("./movies.json");

// Middleware JSON body parser
app.use(express.json());

// Middleware CORS, evita errors de CORS (Cross-Origin Resource Sharing)
app.use(cors())

// Obtenir totes les pel·lícules
app.get("/movies", (req, res) => {
  // Obtenir el gènere de la query string
  const { genre, orderBy, anyInicial, anyFinal } = req.query;

  let sortedMovies = structuredClone(movies) // Clone the array

  // Ordene primer per si hi ha també filtre per gènere o any (Les condicions s'acumulen)
  if (orderBy) {
    sortedMovies = movies.sort((a, b) => {
      if (orderBy === 'rate_desc') {
        return b.rate-a.rate
      }
      return 0
    })
  }

  // Filtrar per any ( a partir de les pelis ordenades)
  if (anyInicial && anyFinal) {
    console.log(anyInicial, anyFinal)
    sortedMovies = movies.filter((movie) => {
      return movie.year >= anyInicial && movie.year <= anyFinal
    })
  }

  // Filtrar per gènere
  if (genre) {
    sortedMovies = sortedMovies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
  }

  res.json(sortedMovies)

});


// Obtenir una pel·lícula
app.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movie = movies.find((movie) => movie.id === id);

  // Tornem la pel·lícula si la troba
  if (movie) return res.json(movie);
  // Si no la troba, tornem un error 404
  res.status(404).json({ message: "Movie not found" });
});

// Crear una pel·lícula
app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  movies.push(newMovie)

  res.status(201).json(newMovie)
})


// Esborrar una pel·lícula
app.delete("/movies/:id", (req, res) => {
  const { id } = req.params;
  const movieIndex = movies.findIndex((movie) => movie.id === id);

  if (movieIndex === -1) {
    return res.status(404).json({ message: "Movie not found" });
  }

  movies.splice(movieIndex, 1);

  return res.json({ message: "Movie deleted" });
});


// Actualitzar una pel·lícula
app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie

  return res.json(updateMovie)
})


app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});

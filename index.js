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

app.get("/movies", (req, res) => {

  // Obtenir el gènere de la query string
  const { genre } = req.query;

  if (genre) {
    // Versió no case sensitive
    //const filteredMovies = movies.filter(movie => movie.genre.includes(genre))
    // Versió case sensitive
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
    res.json(filteredMovies);
  }
  res.json(movies);
});

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
    // 422 Unprocessable Entity
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  // en base de datos
  const newMovie = {
    id: crypto.randomUUID(), // uuid v4
    ...result.data
  }

  // Esto no sería REST, porque estamos guardando
  // el estado de la aplicación en memoria
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

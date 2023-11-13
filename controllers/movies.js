const Movie = require('../models/movies.js')

// GET /api/movies - Retorna la llista de pel·lícules filtrant per gènere
exports.getMovies = async (req, res) => {
  const { genre } = req.query;

  try{
    const movies = await Movie.find({})

    if(genre){
      const filteredMovies = movies.filter(movie => movie.genre.includes(genre))
      res.json(filteredMovies)
    }

    res.json(movies);
  } catch (error) {
    res.send(error)
  }
}

// GET /movies - Retorna la llista de pel·lícules filtrant per gènere
exports.getMoviesView = async (req, res) => {
  const { genre } = req.query;

  try{
    const movies = await Movie.find({})

    if(genre){
      const filteredMovies = movies.filter(movie => movie.genre.includes(genre))
      // Retorna la mateixa vista amb herència de plantilles
      res.render('movies/llistar', {movies: filteredMovies})
    }

    res.render('movies/llistar', {movies})
  } catch (error) {
    res.render('error', {error})
  }
}

// GET /movies/inserir - Mostra el formulari d'inserció de pel·lícules
exports.addMoviesView = async (req, res) => {
  res.render('movies/inserir.njk');
}


// POST /api/movies - Afegeix una pel·lícula
exports.postMovie = async (req, res) => {
  const { title, year, director, duration, genre, rate } = req.body;

  try{
    const newMovie = await Movie.create({
      title,
      year,
      director,
      duration,
      genre,
      rate
    })

    res.json(newMovie)
  } catch (error) {
    res.send(error)
  }
}

// DELETE /api/movies/:id - Elimina una pel·lícula
exports.deleteMovie = async (req, res) => {
  const { id } = req.params;

  // Comprovar que rebem l'objecte usuari amb el token
  console.log("DELETE /api/movies/" + id + " per l'usuari: ", req.user.username)

  try{
    const deletedMovie = await Movie.findByIdAndDelete(id)

    res.json(deletedMovie)
  } catch (error) {
    res.send(error)
  }
}

exports.deleteMovieView = async (req, res) => {
  const { id } = req.params;

  try{
    const deletedMovie = await Movie.findByIdAndDelete(id)
    res.redirect('/movies')
  } catch (error) {
    res.render('error', {error})
  }
}

// Mostra el formulari d'edició de pel·lícules
exports.editMovieView = async (req, res) => {
  const { id } = req.params;

  try{
    const movie = await Movie.findById(id)
    res.render('movies/editar', {movie})
  } catch (error) {
    res.render('error', {error})
  }
}

// POST /movies/:id - Actualitza una pel·lícula
exports.updateMovieView = async (req, res) => {
  const { id } = req.params;

  try{
    const { title, year, director, duration, genre, rate, poster } = req.body;

    await Movie.findByIdAndUpdate(id, 
      {title: title, year: year, director: director, duration: duration, genre: genre, rate: rate, poster: poster},{runValidators: true})

    res.redirect('/movies')
  } catch (error) {
    const movie = new Movie(req.body) // Creem un nou objecte Movie amb les dades antigues del formulari

    // Si hi ha errors de validació, tornem a renderitzar el formulari amb els errors i les dades antigues
    res.render('movies/editar', {movie, errors: error.errors })
  }
}
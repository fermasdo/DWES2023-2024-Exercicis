const express = require('express')

let router = express.Router()

const moviesController = require('../controllers/movies.js')

// GET /movies - Retorna la llista de pel·lícules filtrant per gènere
router.get('/',moviesController.getMoviesView)

// GET /movies/inserir - Mostra el Formulari per afegir pel·lícules
router.get('/inserir',moviesController.addMoviesView)

// POST /movies/:id - Elimina una pel·lícula de la llista
router.post('/delete/:id',moviesController.deleteMovieView)

// GET /movies/editar/:id - Mostra el Formulari per editar pel·lícules
router.get('/editar/:id',moviesController.editMovieView)

// POST /movies/actualitzar/:id - Actualitza una pel·lícula de la llista
router.post('/actualitzar/:id',moviesController.updateMovieView)

router.post('/crear',moviesController.updateMovieView)




module.exports = router
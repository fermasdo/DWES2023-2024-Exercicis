const express = require('express')

// Middleware per validar el token JWT
const verifyToken = require('../routes/validate-token') 

let router = express.Router()

const moviesController = require('../controllers/movies.js')

// GET /api/movies - Retorna la llista de pel·lícules filtrant per gènere
router.get('/',moviesController.getMovies)

// POST /api/movies - Afegeix una pel·lícula a la llista
router.post('/',moviesController.postMovie)

// DELETE /api/movies/:id - Elimina una pel·lícula de la llista
//router.delete('/:id',moviesController.deleteMovie)

// DELETE /api/movies/:id - Elimina una pel·lícula de la llista (versió amb validació de token)
router.delete('/:id', verifyToken, moviesController.deleteMovie)


module.exports = router
const express = require('express')
const app = express()

const PORT = 3000

const poblacions = require('./poblacions.json')

app.get('/', (req, res) => {
  res.send('<h1>API de Poblacions</h1> <h2> Endpoint: GET http://localhost:3000/ciutats </h2>')
})

// Endpoint GET /ciutats
app.get('/ciutats', (req, res) => {
  res.send(JSON.stringify(poblacions))
})


app.listen(PORT, () => {
  console.log(`Exercici 3 - App is running on http://localhost:${PORT}`)
  console.log(`Endpoint: GET http://localhost:${PORT}/ciutats`)
})
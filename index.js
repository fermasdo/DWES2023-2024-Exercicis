const express = require('express')
const app = express()

const PORT = 3000

// Middleware per enregistrar peticions
app.use((req,res,next)=>{
  console.log('Rebuda una petició ', req.ip ,' a les', new Date().toLocaleString())
  console.log('Tipus ', req.method)
  console.log('URL ', req.protocol,'://',req.headers.host , req.url)
  next()
})

app.get('/un', (req, res) => {
  res.send('Un')
})

app.get('/dos', (req, res) => {
  res.send('Dos')
})

// Gestionar 404 Not Found
app.use((req,res)=>{
  res.status(404).send('404 - Not Found')
})

app.listen(PORT, () => {
  console.log(`Exercici - App is running on http://localhost:${PORT}`)
})
const express = require('express');
const app = express();

// Utilitzar express.json() com a middleware per analitzar dades JSON
app.use(express.json());

// Ruta POST que rep dades JSON
app.post('/api/dades', (req, res) => {
  const dades = req.body; // Aquí pots accedir a les dades JSON enviades en la sol·licitud
  
  // Totes les dades rebudes
  console.log(dades);

  // Per accedir a un camp en concret pots fer-ho així:
  console.log('Nom: ', dades.usuari.nom);
  res.status(200).send('Dades rebudes amb èxit');
});

app.listen(3000, () => {
  console.log('Servidor Express escoltant al port 3000');
});

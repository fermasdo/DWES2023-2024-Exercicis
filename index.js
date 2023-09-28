const express = require('express');

const os = require('os');

let app = express();

app.get('/benvinguda', (req, res) => {
    res.send('Hola, benvingut/a');
});

app.get('/data', (req, res) => {
     
    res.send(new Date() );
});

app.get('/usuari', (req, res) => {
    res.send(os.userInfo().username);
});


app.listen(8080);
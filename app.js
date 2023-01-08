const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('servidor funcionando')
})

//rutas
app.get('/ruta-de-prueba', (req, res) => {
  res.send('si funciona la ruta de prueba')
})

app.get('/blog', (req, res) => {
  res.sendFile(__dirname + '/public/blog/index.html');
})
app.get('/datos-para-manipular-en-el-front', (req, res) => {
  res.json({
    title: "lección de api rest ful",
    description: "aprenderemos como funciona y que diferencias tienen las apis, que es rest, y porque ful?"
  })
})
// Iniciar el servidor
app.listen(port, () => {
  console.log('Servidor escuchando en el puerto http://localhost:${port} '+ 'puerto: ' + port);
});

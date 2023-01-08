const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
app.get('/', (req, res) => {
  res.send('servidor funcionando')
})
// Conectarse a la base de datos
//mongoose.connect('mongodb://localhost/my_database');

// Configurar el middleware para manejar el envío de formularios
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ dest: './uploads/' }).single('video'));

// Gestionar el envío del formulario
app.post('/upload', function(req, res) {
  // Obtener los datos del formulario
  var title = req.body.title;
  var description = req.body.description;
  var tags = req.body.tags.split(',');
  var video = req.file;

  // Validar los datos
  if (!title || !description || !tags || !video) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  // Crear un nuevo objeto de video
  var newVideo = new Video({
    title: title,
    description: description,
    tags: tags,
    video: video.path
  });

  // Guardar el video en la base de datos
  newVideo.save(function(err) {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send('Video subido correctamente');
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log('Servidor escuchando en el puerto http://localhost:${port} '+ 'puerto: ' + port);
});

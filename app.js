const express = require('express');
const app = express();
const productosRoutes = require('./routes/productos');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Configurar motor de plantillas
app.set('view engine', 'ejs');

// Usar las rutas
app.use('/', productosRoutes);

// Puerto
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

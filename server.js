const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Importar rutas
const automovilesRoutes = require('./routes/automoviles');

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/db_automoviles', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("No se pudo conectar a MongoDB base de datos", err));

// Rutas
app.use('/api/automoviles', automovilesRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

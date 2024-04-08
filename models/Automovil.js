const mongoose = require('mongoose');

const automovilSchema = new mongoose.Schema({
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    anio: { type: Number, required: true },
    color: { type: String, required: true },
    precio: { type: Number, required: true },
}, { timestamps: true }); // Añade automáticamente campos createdAt y updatedAt);

module.exports = mongoose.model('Automovil', automovilSchema);

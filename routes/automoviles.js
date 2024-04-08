const express = require('express');
const router = express.Router();
const automovilesController = require('../controllers/automovilesController');

router.post('/', automovilesController.crearAutomovil);
router.get('/', automovilesController.obtenerAutomoviles);
// Ruta para buscar por marca y modelo
router.get('/buscar', automovilesController.buscarPorMarcaYModelo);
router.get('/:id', automovilesController.obtenerAutomovil);
router.put('/:id', automovilesController.actualizarAutomovil);
router.delete('/:id', automovilesController.eliminarAutomovil);


module.exports = router;

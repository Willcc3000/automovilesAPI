const express = require('express');
const router = express.Router();
const automovilesController = require('../controllers/automovilesController');

// Ruta para buscar por marca y modelo
router.get('/buscar', automovilesController.buscarPorMarcaYModelo);
// Ruta para obtener los últimos automóviles añadidos
router.get('/ultimos', automovilesController.obtenerUltimosAutomoviles);
// Ruta para obtener los automóviles más baratos
router.get('/mas-baratos', automovilesController.obtenerAutomovilesMasBaratos);
// Ruta para eliminar todos los automóviles
router.delete('/eliminar-todos', automovilesController.eliminarTodosAutomoviles);

router.post('/', automovilesController.crearAutomovil);
router.get('/', automovilesController.obtenerAutomoviles);
router.get('/:id', automovilesController.obtenerAutomovil);
router.put('/:id', automovilesController.actualizarAutomovil);
router.delete('/:id', automovilesController.eliminarAutomovil);


module.exports = router;

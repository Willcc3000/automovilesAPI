const Automovil = require('../models/Automovil');

exports.crearAutomovil = async (req, res) => {
    try {
        let automovil = new Automovil(req.body);
        await automovil.save();
        res.send(automovil);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al crear');
    }
};

exports.obtenerAutomoviles = async (req, res) => {
    try {
        const automoviles = await Automovil.find().sort({ createdAt: -1 });
        res.json(automoviles);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al listar todo');
    }
};


exports.obtenerAutomovil = async (req, res) => {
    try {
        let automovil = await Automovil.findById(req.params.id);
        if (!automovil) {
            res.status(404).json({ msg: 'No existe el automóvil' });
        }
        res.json(automovil);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error buscar');
    }
};

exports.actualizarAutomovil = async (req, res) => {
    try {
        const { marca, modelo, anio, color, precio } = req.body;
        let automovil = await Automovil.findById(req.params.id);

        if (!automovil) {
            res.status(404).json({ msg: 'No existe el automóvil' });
        }

        automovil.marca = marca;
        automovil.modelo = modelo;
        automovil.anio = anio;
        automovil.color = color;
        automovil.precio = precio;

        automovil = await Automovil.findOneAndUpdate({ _id: req.params.id }, automovil, { new: true });
        res.json(automovil);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al actualizar');
    }
};

exports.eliminarAutomovil = async (req, res) => {
  try {
      const result = await Automovil.findByIdAndDelete(req.params.id);
      if (result) {
          res.json({ msg: 'Automóvil eliminado con éxito' });
      } else {
          res.status(404).json({ msg: 'No se encontró el automóvil con el ID proporcionado' });
      }
  } catch (error) {
      console.error(error);
      res.status(500).send('Hubo un error');
  }
};

exports.buscarPorMarcaYModelo = async (req, res) => {
  const { marca, modelo } = req.query; // Asume que marca y modelo se pasan como query params

  try {
      const automoviles = await Automovil.find({ marca: marca, modelo: modelo })
                                         .sort({ createdAt: -1 }); // Ordena de más reciente a más antiguo
      if (automoviles.length === 0) {
          return res.status(404).send('No se encontraron automóviles con esa marca y modelo');
      }
      res.json(automoviles);
  } catch (error) {
      console.error(error);
      res.status(500).send('Hubo un error');
  }
};

exports.obtenerUltimosAutomoviles = async (req, res) => {
    try {
        const automoviles = await Automovil.find().sort({ createdAt: -1 }).limit(3); // Los últimos 3 automóviles
        res.json(automoviles);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al listar los últimos automóviles');
    }
};

exports.eliminarTodosAutomoviles = async (req, res) => {
    try {
        await Automovil.deleteMany({});
        res.json({ msg: 'Todos los automóviles han sido eliminados.' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al intentar eliminar todos los automóviles');
    }
};

exports.obtenerAutomovilesMasBaratos = async (req, res) => {
    const limite = parseInt(req.query.limite) || 3; // Permite al cliente especificar un límite o usa 3 por defecto

    try {
        const automovilesBaratos = await Automovil.find().sort({ precio: 1 }).limit(limite);
        res.json(automovilesBaratos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al buscar los automóviles más baratos');
    }
};

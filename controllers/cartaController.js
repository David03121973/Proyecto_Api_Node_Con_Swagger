// controllers/cartaController.js

const cartaService = require("../services/cartaService");

/**
 * Obtener todas las cartas
 */
const getCartas = async (req, res) => {
    try {
        const cartas = await cartaService.getAllCartas();

        // Verificar si hay cartas
        if (!cartas || cartas.length === 0) {
            return res.status(200).json([]); // Retornar un array vacío si no hay cartas
        }

        return res.status(200).json(cartas);
    } catch (error) {
        console.error("Error al obtener las cartas:", error);
        return res.status(500).json({ message: "Error al obtener las cartas", error });
    }
};

/**
 * Obtener una carta por ID
 */
const getCartaById = async (req, res) => {
    const { id } = req.params; // Obtener el ID de los parámetros
    try {
        const carta = await cartaService.getCartaById(id);
        if (!carta) {
            return res.status(404).json({ message: "Carta no encontrada" });
        }
        return res.status(200).json(carta);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener la carta", error });
    }
};

/**
 * Crear una nueva carta
 */
const createCarta = async (req, res) => {
    const { nombre, tipo, descripcion, raza, arquetipo, imagen } = req.body; // Obtener los datos de la carta desde el cuerpo de la solicitud

    // Validar campos
    if (!nombre || !tipo || !raza || !imagen) {
        return res.status(400).json({ message: "El nombre, tipo, raza y imagen son obligatorios." });
    }

    try {
        const cartaData = { nombre, tipo, descripcion, raza, arquetipo, imagen }; // Preparar los datos para la creación
        const newCarta = await cartaService.createCarta(cartaData);
        return res.status(201).json(newCarta);
    } catch (error) {
        return res.status(500).json({ message: "Error al crear la carta", error });
    }
};

/**
 * Obtener cartas con paginación
 */
const getCartasWithPagination = async (req, res) => {
    const page = parseInt(req.params.page) || 1; // Obtener el número de página desde los parámetros de la URL
    const limit = parseInt(req.params.limit) || 10; // Obtener el límite de resultados desde los parámetros de la URL

    try {
        const { cartas, totalCartas, totalPages } = await cartaService.getCartasWithPagination(page, limit);
        return res.status(200).json({ cartas, totalCartas, totalPages });
    } catch (error) {
        console.error("Error al obtener las cartas con paginación:", error);
        return res.status(500).json({ message: "Error al obtener las cartas", error });
    }
};

/**
 * Actualizar una carta
 */
const updateCarta = async (req, res) => {
    const { id } = req.params; // Obtener el ID de la carta desde los parámetros
    const { nombre, tipo, descripcion, raza, arquetipo, imagen } = req.body; // Obtener los datos a actualizar desde el cuerpo de la solicitud

    // Validar campos
    if (!nombre && !tipo && !raza && !imagen) {
        return res.status(400).json({ message: "Se debe proporcionar al menos un campo para actualizar." });
    }

    try {
        // Obtener la carta existente
        const carta = await cartaService.getCartaById(id);
        if (!carta) {
            return res.status(404).json({ message: "Carta no encontrada" });
        }

        // Preparar los datos para la actualización
        const updatedCartaData = {
            nombre: nombre || carta.nombre, // Mantener el nombre anterior si no se proporciona uno nuevo
            tipo: tipo || carta.tipo,
            descripcion: descripcion || carta.descripcion,
            raza: raza || carta.raza,
            arquetipo: arquetipo || carta.arquetipo,
            imagen: imagen || carta.imagen,
        };

        // Actualizar la carta
        const updatedCarta = await cartaService.updateCarta(id, updatedCartaData);
        return res.status(200).json(updatedCarta);
    } catch (error) {
        console.error("Error al actualizar la carta:", error);
        return res.status(500).json({ message: "Error al actualizar la carta", error });
    }
};

/**
 * Eliminar una carta
 */
const deleteCarta = async (req, res) => {
    const { id } = req.params; // Obtener el ID de los parámetros
    try {
        const result = await cartaService.deleteCarta(id);
        if (result) {
            return res.status(204).send(); // No content
        } else {
            return res.status(404).json({ message: "Carta no encontrada" });
        }
    } catch (error) {
        console.error("Error al eliminar la carta:", error);
        return res.status(500).json({ message: "Error al eliminar la carta", error });
    }
};

const getCartasFilteredWithPagination = async (req, res) => {
    const page = parseInt(req.params.page) || 1; // Obtener el número de página desde los parámetros de la URL
    const limit = parseInt(req.params.limit) || 10; // Obtener el límite de resultados desde los parámetros de la URL
    const { nombre, tipo, arquetipo } = req.body; // Obtener los filtros desde el cuerpo de la solicitud
  
    try {
      const filters = {};
      if (nombre) filters.nombre = nombre; // Aplicar filtro por nombre si está presente
      if (tipo) filters.tipo = tipo; // Aplicar filtro por tipo si está presente
      if (arquetipo) filters.arquetipo = arquetipo; // Aplicar filtro por arquetipo si está presente
  
      const { cartas, totalCartas, totalPages } = await cartaService.getCartasFilteredWithPagination(
        page,
        limit,
        filters
      );
  
      return res.status(200).json({ cartas, totalCartas, totalPages });
    } catch (error) {
      console.error("Error al obtener las cartas filtradas con paginación:", error);
      return res.status(500).json({ message: "Error al obtener las cartas", error });
    }
  };

  const getCartasAleatorias = async (req, res) => {
    const { cantidad, arquetipo } = req.params;
  
    // Validar campos
    if (!cantidad || !arquetipo) {
      return res.status(400).json({
        message: "Los campos 'cantidad' y 'arquetipo' son obligatorios.",
      });
    }
  
    if (isNaN(cantidad) || cantidad <= 0) {
      return res.status(400).json({
        message: "El campo 'cantidad' debe ser un número entero positivo.",
      });
    }
  
    if (typeof arquetipo !== "string" || arquetipo.trim() === "") {
      return res.status(400).json({
        message: "El campo 'arquetipo' debe ser una cadena de texto no vacía.",
      });
    }
  
    try {
      const cartasAleatorias = await cartaService.getCartasAleatorias(cantidad, arquetipo);
      return res.status(200).json(cartasAleatorias);
    } catch (error) {
      console.error("Error al obtener las cartas aleatorias:", error);
      return res.status(500).json({
        message: "Error al obtener las cartas aleatorias",
        error,
      });
    }
  };

module.exports = {
    getCartas,
    getCartaById,
    updateCarta,
    deleteCarta,
    createCarta,
    getCartasWithPagination,
    getCartasFilteredWithPagination,
    getCartasAleatorias
};
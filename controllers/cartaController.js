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

module.exports = {
    getCartas,
    getCartaById,
    updateCarta,
    deleteCarta,
    createCarta
};
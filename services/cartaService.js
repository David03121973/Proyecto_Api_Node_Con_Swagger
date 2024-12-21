// services/cartaService.js

const Carta = require("../models/carta"); // Importar el modelo de carta

/**
 * Obtener todas las cartas
 */
const getAllCartas = async () => {
    try {
        return await Carta.findAll(); // Devuelve todas las cartas
    } catch (error) {
        console.log("Error en los servicios de getAllCartas: ", error);
        throw error; // Lanza el error para que el controlador pueda manejarlo
    }
};

/**
 * Obtener una carta por ID
 */
const getCartaById = async (id) => {
    try {
        return await Carta.findOne({
            where: { id_carta: id } // Busca la carta por ID
        });
    } catch (error) {
        console.log("Error en los servicios de getCartaById: ", error);
        throw error; // Lanza el error para que el controlador pueda manejarlo
    }
};

/**
 * Crear una nueva carta
 */
const createCarta = async (cartaData) => {
    try {
        return await Carta.create(cartaData); // Crea una nueva carta
    } catch (error) {
        console.log("Error en el servicio de crear carta: ", error);
        throw error; // Lanza el error para que el controlador pueda manejarlo
    }
};

/**
 * Actualizar una carta
 */
const updateCarta = async (id, cartaData) => {
    try {
        const carta = await Carta.findOne({ where: { id_carta: id } });
        if (carta) {
            return await carta.update(cartaData); // Actualiza la carta si se encuentra
        }
        return null; // Si no se encuentra la carta
    } catch (error) {
        console.log("Error en el servicio de actualizar carta: ", error);
        throw error; // Lanza el error para que el controlador pueda manejarlo
    }
};

/**
 * Eliminar una carta
 */
const deleteCarta = async (id) => {
    try {
        const carta = await Carta.findOne({ where: { id_carta: id } });
        if (carta) {
            return await carta.destroy(); // Elimina la carta si se encuentra
        }
        return null; // Si no se encuentra la carta
    } catch (error) {
        console.log("Error en el servicio de eliminar carta: ", error);
        throw error; // Lanza el error para que el controlador pueda manejarlo
    }
};

module.exports = {
    getAllCartas,
    getCartaById,
    createCarta,
    updateCarta,
    deleteCarta,
};
// services/resennaService.js

const Resenna  = require("../models/resenna"); // Importar el modelo de reseña
const Usuario = require("../models/usuario")

/**
 * Obtener todas las reseñas
 */
const getAllResennas = async () => {
    try {
        return await Resenna.findAll({
            include: [{
                model: Usuario, // Incluir el modelo de Usuario
                required: true // Asegura que solo se devuelvan reseñas con usuarios asociados
            }]
        });
    } catch (error) {
        console.log("Error en los servicios de getAllResennas: ", error);
        throw error; // Lanza el error para que el controlador pueda manejarlo
    }
};

/**
 * Obtener una reseña por ID
 */
const getResennaById = async (id) => {
    try {
        return await Resenna.findOne({
            where: { id_resenna: id },
            include: [{
                model: Usuario, // Incluir el modelo de Usuario
                required: true // Asegura que solo se devuelvan reseñas con usuarios asociados
            }]
        });
    } catch (error) {
        console.log("Error en los servicios de getResennaById: ", error);
        throw error; // Lanza el error para que el controlador pueda manejarlo
    }
};

/**
 * Crear una nueva reseña
 */
const createResenna = async (resennaData) => {
    try {
        return await Resenna.create(resennaData);
    } catch (error) {
        console.log("Error en el servicio de crear reseña: ", error);
        throw error; // Lanza el error para que el controlador pueda manejarlo
    }
};

/**
 * Actualizar una reseña
 */
const updateResenna = async (id, resennaData) => {
    try {
        const resenna = await Resenna.findOne({ where: { id_resenna: id } });
        if (resenna) {
            return await resenna.update(resennaData);
        }
        return null; // Si no se encuentra la reseña
    } catch (error) {
        console.log("Error en el servicio de actualizar reseña: ", error);
        throw error; // Lanza el error para que el controlador pueda manejarlo
    }
};

/**
 * Eliminar una reseña
 */
const deleteResenna = async (id) => {
    try {
        const resenna = await Resenna.findOne({ where: { id_resenna: id } });
        if (resenna) {
            return await resenna.destroy();
        }
        return null; // Si no se encuentra la reseña
    } catch (error) {
        console.log("Error en el servicio de eliminar reseña: ", error);
        throw error; // Lanza el error para que el controlador pueda manejarlo
    }
};

module.exports = {
    getAllResennas,
    getResennaById,
    createResenna,
    updateResenna,
    deleteResenna,
};
// services/ventaService.js

const Venta = require("../models/venta"); // Importar el modelo de venta
const Usuario = require("../models/usuario"); // Importar el modelo de usuario
const Carta = require("../models/carta"); // Importar el modelo de carta

/**
 * Obtener todas las ventas
 */
const getAllVentas = async () => {
    try {
        return await Venta.findAll({
            include: [
                {
                    model: Carta, // Incluir el modelo de Carta
                    as: "carta",
                    required: true // Asegura que solo se devuelvan ventas con cartas asociadas
                },
                {
                    model: Usuario, // Incluir el modelo de Usuario como vendedor
                    as: 'vendedor', // Alias para el vendedor
                    required: true // Asegura que solo se devuelvan ventas con vendedores asociados
                },
                {
                    model: Usuario, // Incluir el modelo de Usuario como comprador
                    as: 'comprador', // Alias para el comprador
                    required: false // Permitir que las ventas sin comprador también sean devueltas
                }
            ]
        });
    } catch (error) {
        console.log("Error en los servicios de getAllVentas: ", error);
        throw error; // Lanza el error para que el controlador pueda manejarlo
    }
};

/**
 * Obtener una venta por ID
 */
const getVentaById = async (id) => {
    try {
        return await Venta.findOne({
            where: { id_venta: id },
            include: [
                {
                    model: Carta, // Incluir el modelo de Carta
                    as: 'carta',
                    required: true // Asegura que solo se devuelvan ventas con cartas asociadas
                },
                {
                    model: Usuario, // Incluir el modelo de Usuario como vendedor
                    as: 'vendedor', // Alias para el vendedor
                    required: true // Asegura que solo se devuelvan ventas con vendedores asociados
                },
                {
                    model: Usuario, // Incluir el modelo de Usuario como comprador
                    as: 'comprador', // Alias para el comprador
                    required: false // Permitir que las ventas sin comprador también sean devueltas
                }
            ]
        });
    } catch (error) {
        console.log("Error en los servicios de getVentaById: ", error);
        throw error; // Lanza el error para que el controlador pueda manejarlo
    }
};

/**
 * Crear una nueva venta
 */
const createVenta = async (ventaData) => {
    try {
        return await Venta.create(ventaData); // Crea una nueva venta
    } catch (error) {
        console.log("Error en el servicio de crear venta: ", error);
        throw error; // Lanza el error para que el controlador pueda manejarlo
    }
};

/**
 * Actualizar una venta
 */
const updateVenta = async (id, ventaData) => {
    try {
        const venta = await Venta.findOne({ where: { id_venta: id } });
        if (venta) {
            return await venta.update(ventaData); // Actualiza la venta si se encuentra
        }
        return null; // Si no se encuentra la venta
    } catch (error) {
        console.log("Error en el servicio de actualizar venta: ", error);
        throw error; // Lanza el error para que el controlador pueda manejarlo
    }
};

/**
 * Eliminar una venta
 */
const deleteVenta = async (id) => {
    try {
        const venta = await Venta.findOne({ where: { id_venta: id } });
        if (venta) {
            return await venta.destroy(); // Elimina la venta si se encuentra
        }
        return null; // Si no se encuentra la venta
    } catch (error) {
        console.log("Error en el servicio de eliminar venta: ", error);
        throw error; // Lanza el error para que el controlador pueda manejarlo
    }
};

module.exports = {
    getAllVentas,
    getVentaById,
    createVenta,
    updateVenta,
    deleteVenta,
};
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

const createVenta = async (ventaData) => {
    try {
        return await Venta.create(ventaData); // Ya maneja el campo `estado` si se pasa en `ventaData`
    } catch (error) {
        console.log("Error en el servicio de crear venta: ", error);
        throw error;
    }
};

const updateVenta = async (id, ventaData) => {
    try {
        const venta = await Venta.findOne({ where: { id_venta: id } });
        if (venta) {
            return await venta.update(ventaData); // Ya maneja el campo `estado` si se pasa en `ventaData`
        }
        return null;
    } catch (error) {
        console.log("Error en el servicio de actualizar venta: ", error);
        throw error;
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
/**
 * Obtener todas las ventas por ID de carta
 */
const getVentasByCartaId = async (id_carta) => {
    try {
      return await Venta.findAll({
        where: {
          id_carta,
          id_usuario_comprador: null, // Agregar condición para obtener ventas con comprador null
        },
        order: [['precio_venta', 'ASC']], // Ordenar por precio de venta de menor a mayor
        include: [
          {
            model: Carta,
            as: 'carta',
            required: true
          },
          {
            model: Usuario,
            as: 'vendedor',
            required: true
          },
          {
            model: Usuario,
            as: 'comprador',
            required: false
          }
        ]
      });
    } catch (error) {
      console.log("Error en los servicios de getVentasByCartaId: ", error);
      throw error;
    }
  };

  /**
 * Obtener todas las compras por ID de carta
 */
  const { Op } = require('sequelize'); // Asegúrate de importar Op desde sequelize

  const getComprasByCartaId = async (id_carta) => {
    try {
      return await Venta.findAll({
        where: {
          id_carta,
          id_usuario_comprador: {
            [Op.ne]: null // Cambiar la condición para obtener ventas donde id_usuario_comprador no sea null
          }
        },
        order: [['fecha_venta', 'ASC']], // Ordenar por precio de venta de menor a mayor
        include: [
          {
            model: Carta,
            as: 'carta',
            required: true
          },
          {
            model: Usuario,
            as: 'vendedor',
            required: true
          },
          {
            model: Usuario,
            as: 'comprador',
            required: false
          }
        ]
      });
    } catch (error) {
      console.log("Error en los servicios de getComprasByCartaId: ", error);
      throw error;
    }
  };
  
module.exports = {
    getAllVentas,
    getVentaById,
    createVenta,
    updateVenta,
    deleteVenta,
    getVentasByCartaId,
    getComprasByCartaId
};
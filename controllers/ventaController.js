// controllers/ventaController.js

const ventaService = require("../services/ventaService");

/**
 * Obtener todas las ventas
 */
const getVentas = async (req, res) => {
    try {
        const ventas = await ventaService.getAllVentas();

        // Verificar si hay ventas
        if (!ventas || ventas.length === 0) {
            return res.status(200).json([]); // Retornar un array vacío si no hay ventas
        }

        return res.status(200).json(ventas);
    } catch (error) {
        console.error("Error al obtener las ventas:", error);
        return res.status(500).json({ message: "Error al obtener las ventas", error });
    }
};

/**
 * Obtener una venta por ID
 */
const getVentaById = async (req, res) => {
    const { id } = req.params; // Obtener el ID de los parámetros
    try {
        const venta = await ventaService.getVentaById(id);
        if (!venta) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }
        return res.status(200).json(venta);
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener la venta", error });
    }
};

const createVenta = async (req, res) => {
    const { id_carta, id_usuario_vendedor, id_usuario_comprador, precio_venta, fecha_venta, estado } = req.body;

    // Validar campos
    if (!id_carta || !id_usuario_vendedor || !precio_venta || !estado) {
        return res.status(400).json({ message: "Los campos id_carta, id_usuario_vendedor, precio_venta y estado son obligatorios." });
    }

    try {
        const ventaData = { id_carta, id_usuario_vendedor, id_usuario_comprador, precio_venta, fecha_venta, estado };
        const newVenta = await ventaService.createVenta(ventaData);
        return res.status(201).json(newVenta);
    } catch (error) {
        return res.status(500).json({ message: "Error al crear la venta", error });
    }
};

const updateVenta = async (req, res) => {
    const { id } = req.params;
    const { id_carta, id_usuario_vendedor, id_usuario_comprador, precio_venta, fecha_venta, estado } = req.body;

    // Validar campos
    if (!id_carta && !id_usuario_vendedor && !precio_venta && !estado) {
        return res.status(400).json({ message: "Se debe proporcionar al menos un campo para actualizar." });
    }

    try {
        const venta = await ventaService.getVentaById(id);
        if (!venta) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }

        const updatedVentaData = {
            id_carta: id_carta || venta.id_carta,
            id_usuario_vendedor: id_usuario_vendedor || venta.id_usuario_vendedor,
            id_usuario_comprador: id_usuario_comprador || venta.id_usuario_comprador,
            precio_venta: precio_venta || venta.precio_venta,
            fecha_venta: fecha_venta || venta.fecha_venta,
            estado: estado || venta.estado,
        };

        const updatedVenta = await ventaService.updateVenta(id, updatedVentaData);
        return res.status(200).json(updatedVenta);
    } catch (error) {
        console.error("Error al actualizar la venta:", error);
        return res.status(500).json({ message: "Error al actualizar la venta", error });
    }
};

/**
 * Eliminar una venta
 */
const deleteVenta = async (req, res) => {
    const { id } = req.params; // Obtener el ID de los parámetros
    try {
        const result = await ventaService.deleteVenta(id);
        if (result) {
            return res.status(204).send(); // No content
        } else {
            return res.status(404).json({ message: "Venta no encontrada" });
        }
    } catch (error) {
        console.error("Error al eliminar la venta:", error);
        return res.status(500).json({ message: "Error al eliminar la venta", error });
    }
};
/**
 * Obtener todas las ventas por ID de carta
 */
const getVentasByCartaId = async (req, res) => {
    const { id } = req.params; // Obtener el ID de la carta desde los parámetros
  
    // Validar que el ID sea un número
    if (isNaN(id)) {
      return res.status(400).json({ message: "El ID de la carta debe ser un número." });
    }
  
    try {
      const ventas = await ventaService.getVentasByCartaId(id);
  
      // Verificar si hay ventas
      if (!ventas || ventas.length === 0) {
        return res.status(200).json([]); // Retornar un array vacío si no hay ventas
      }
  
      return res.status(200).json(ventas);
    } catch (error) {
      console.error("Error al obtener las ventas por ID de carta:", error);
      return res.status(500).json({ message: "Error al obtener las ventas", error });
    }
  };

  /**
 * Obtener todas las compras por ID de carta
 */
  const getComprasByCartaId = async (req, res) => {
    const { id } = req.params; // Obtener el ID de la carta desde los parámetros
  
    // Validar que el ID sea un número
    if (isNaN(id)) {
      return res.status(400).json({ message: "El ID de la carta debe ser un número." });
    }
  
    try {
      const ventas = await ventaService.getComprasByCartaId(id);
  
      // Verificar si hay ventas
      if (!ventas || ventas.length === 0) {
        return res.status(200).json([]); // Retornar un array vacío si no hay ventas
      }
  
      return res.status(200).json(ventas);
    } catch (error) {
      console.error("Error al obtener las compras por ID de carta:", error);
      return res.status(500).json({ message: "Error al obtener las compras", error });
    }
  };

module.exports = {
    getVentas,
    getVentaById,
    createVenta,
    updateVenta,
    deleteVenta,
    getVentasByCartaId,
    getComprasByCartaId
};
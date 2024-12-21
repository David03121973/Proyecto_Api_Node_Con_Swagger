// routes/ventaRouts.js

const express = require("express");
const router = express.Router();
const ventaController = require("../controllers/ventaController");

/**
 * @swagger
 * tags:
 *   - name: Venta
 *     description: Operaciones relacionadas con usuarios
 */

/**
 * @swagger
 * /venta:
 *   get:
 *     tags: [Venta]
 *     summary: Obtener todas las ventas
 *     description: Devuelve una lista de todas las ventas registradas.
 *     responses:
 *       200:
 *         description: Lista de ventas obtenida correctamente.
 */
router.get("/venta", ventaController.getVentas);

/**
 * @swagger
 * /venta/{id}:
 *   get:
 *     tags: [Venta]
 *     summary: Obtener una venta por ID
 *     description: Devuelve una venta específica usando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la venta a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Venta encontrada.
 *       404:
 *         description: Venta no encontrada.
 */
router.get("/venta/:id", ventaController.getVentaById);

/**
 * @swagger
 * /venta/createVenta:
 *   post:
 *     tags: [Venta]
 *     summary: Crear una nueva venta
 *     description: Crea una nueva venta con la información proporcionada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_carta:
 *                 type: integer
 *               id_usuario_vendedor:
 *                 type: integer
 *               id_usuario_comprador:
 *                 type: integer
 *               precio_venta:
 *                 type: number
 *                 format: float
 *               fecha_venta:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Venta creada exitosamente.
 *       400:
 *         description: Datos de entrada inválidos.
 */
router.post("/venta/createVenta", ventaController.createVenta);

/**
 * @swagger
 * /venta/updateVenta/{id}:
 *   put:
 *     tags: [Venta]
 *     summary: Actualizar una venta
 *     description: Actualiza la información de una venta específica por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la venta a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_carta:
 *                 type: integer
 *               id_usuario_vendedor:
 *                 type: integer
 *               id_usuario_comprador:
 *                 type: integer
 *               precio_venta:
 *                 type: number
 *                 format: float
 *               fecha_venta:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Venta actualizada exitosamente.
 *       404:
 *         description: Venta no encontrada.
 *       400:
 *         description: Datos de entrada inválidos.
 */
router.put("/venta/updateVenta/:id", ventaController.updateVenta);

/**
 * @swagger
 * /venta/deleteVenta/{id}:
 *   delete:
 *     tags: [Venta]
 *     summary: Eliminar una venta
 *     description: Elimina una venta específica por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la venta a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Venta eliminada exitosamente.
 *       404:
 *         description: Venta no encontrada.
 */
router.delete("/venta/deleteVenta/:id", ventaController.deleteVenta);

module.exports = router;
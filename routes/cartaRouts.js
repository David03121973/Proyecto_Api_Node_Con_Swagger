// routes/cartaRouts.js

const express = require("express");
const router = express.Router();
const cartaController = require("../controllers/cartaController");

/**
 * @swagger
 * tags:
 *   - name: Carta
 *     description: Operaciones relacionadas con usuarios
 */

/**
 * @swagger
 * /carta:
 *   get:
 *     tags: [Carta]
 *     summary: Obtener todas las cartas
 *     description: Devuelve una lista de todas las cartas registradas.
 *     responses:
 *       200:
 *         description: Lista de cartas obtenida correctamente.
 */
router.get("/carta", cartaController.getCartas);

/**
 * @swagger
 * /carta/{id}:
 *   get:
 *     tags: [Carta]
 *     summary: Obtener una carta por ID
 *     description: Devuelve una carta específica usando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la carta a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carta encontrada.
 *       404:
 *         description: Carta no encontrada.
 */
router.get("/carta/:id", cartaController.getCartaById);

/**
 * @swagger
 * /carta/createCarta:
 *   post:
 *     tags: [Carta]
 *     summary: Crear una nueva carta
 *     description: Crea una nueva carta con la información proporcionada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               tipo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               raza:
 *                 type: string
 *               arquetipo:
 *                 type: string
 *               imagen:
 *                 type: string
 *     responses:
 *       201:
 *         description: Carta creada exitosamente.
 *       400:
 *         description: Datos de entrada inválidos.
 */
router.post("/carta/createCarta", cartaController.createCarta);

/**
 * @swagger
 * /carta/updateCarta/{id}:
 *   put:
 *     tags: [Carta]
 *     summary: Actualizar una carta
 *     description: Actualiza la información de una carta específica por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la carta a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               tipo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               raza:
 *                 type: string
 *               arquetipo:
 *                 type: string
 *               imagen:
 *                 type: string
 *     responses:
 *       200:
 *         description: Carta actualizada exitosamente.
 *       404:
 *         description: Carta no encontrada.
 *       400:
 *         description: Datos de entrada inválidos.
 */
router.put("/carta/updateCarta/:id", cartaController.updateCarta);

/**
 * @swagger
 * /carta/deleteCarta/{id}:
 *   delete:
 *     tags: [Carta]
 *     summary: Eliminar una carta
 *     description: Elimina una carta específica por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la carta a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Carta eliminada exitosamente.
 *       404:
 *         description: Carta no encontrada.
 */
router.delete("/carta/deleteCarta:id", cartaController.deleteCarta);

module.exports = router;
// routes/resennaRouts.js

const express = require("express");
const router = express.Router();
const resennaController = require("../controllers/resennaController");
const authenticate = require("../helpers/authenticate");

/**
 * @swagger
 * tags:
 *   - name: Resenna
 *     description: Operaciones relacionadas con usuarios
 */

/**
 * @swagger
 * /resenna:
 *   get:
 *     tags: [Resenna]
 *     summary: Obtener todas las reseñas
 *     description: Devuelve una lista de todas las reseñas registradas.
 *     responses:
 *       200:
 *         description: Lista de reseñas obtenida correctamente.
 */
router.get("/resenna", resennaController.getResennas);

/**
 * @swagger
 * /resenna/{id}:
 *   get:
 *     tags: [Resenna]
 *     summary: Obtener una reseña por ID
 *     description: Devuelve una reseña específica usando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la reseña a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reseña encontrada.
 *       404:
 *         description: Reseña no encontrada.
 */
router.get("/resenna/:id", resennaController.getResennaById);

/**
 * @swagger
 * /resenna/CreateResenna:
 *   post:
 *     tags: [Resenna]
 *     summary: Crear una nueva reseña
 *     description: Crea una nueva reseña con la información proporcionada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *               valoracion:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *               id_usuario:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Reseña creada exitosamente.
 *       400:
 *         description: Datos de entrada inválidos.
 */
router.post("/resenna/CreateResenna",authenticate(), resennaController.createResenna);

/**
 * @swagger
 * /resenna/updateResenna/{id}:
 *   put:
 *     tags: [Resenna]
 *     summary: Actualizar una reseña
 *     description: Actualiza la información de una reseña específica por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la reseña a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *               valoracion:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       200:
 *         description: Reseña actualizada exitosamente.
 *       404:
 *         description: Reseña no encontrada.
 *       400:
 *         description: Datos de entrada inválidos.
 */
router.put("/resenna/updateResenna/:id",authenticate(), resennaController.updateResenna);

/**
 * @swagger
 * /resenna/deleteResenna/{id}:
 *   delete:
 *     tags: [Resenna]
 *     summary: Eliminar una reseña
 *     description: Elimina una reseña específica por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la reseña a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Reseña eliminada exitosamente.
 *       404:
 *         description: Reseña no encontrada.
 */
router.delete("/resenna/deleteResenna/:id",authenticate(), resennaController.deleteResenna);

module.exports = router;
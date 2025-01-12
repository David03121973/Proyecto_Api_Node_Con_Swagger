// routes/cartaRouts.js

const express = require("express");
const router = express.Router();
const cartaController = require("../controllers/cartaController");
const authenticate = require("../helpers/authenticate");

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
router.post("/carta/createCarta",authenticate(), cartaController.createCarta);

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
router.put("/carta/updateCarta/:id",authenticate(), cartaController.updateCarta);

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
router.delete("/carta/deleteCarta:id",authenticate(), cartaController.deleteCarta);

/**
 * @swagger
 * /carta/paginated/{page}/{limit}:
 *   get:
 *     tags: [Carta]
 *     summary: Obtener cartas con paginación
 *     description: Devuelve una lista de cartas paginadas.
 *     parameters:
 *       - in: path
 *         name: page
 *         required: true
 *         description: Número de página a obtener.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: limit
 *         required: true
 *         description: Número de cartas por página.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de cartas obtenida correctamente.
 */
router.get("/carta/paginated/:page/:limit", cartaController.getCartasWithPagination);

/**
 * @swagger
 * /carta/filtered/{page}/{limit}:
 *   post:
 *     tags: [Carta]
 *     summary: Obtener cartas filtradas con paginación
 *     description: Devuelve una lista de cartas filtradas por nombre, tipo y arquetipo, con paginación. La búsqueda es insensible a mayúsculas, tildes y busca coincidencias parciales.
 *     parameters:
 *       - in: path
 *         name: page
 *         required: true
 *         description: Número de página a obtener.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: limit
 *         required: true
 *         description: Número de cartas por página.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la carta para filtrar (búsqueda parcial e insensible a mayúsculas y tildes).
 *               tipo:
 *                 type: string
 *                 description: Tipo de la carta para filtrar (búsqueda parcial e insensible a mayúsculas y tildes).
 *               arquetipo:
 *                 type: string
 *                 description: Arquetipo de la carta para filtrar (búsqueda parcial e insensible a mayúsculas y tildes).
 *     responses:
 *       200:
 *         description: Lista de cartas filtradas obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 cartas:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Carta'
 *                 totalCartas:
 *                   type: integer
 *                   description: Total de cartas que coinciden con los filtros.
 *                 totalPages:
 *                   type: integer
 *                   description: Total de páginas disponibles.
 *       500:
 *         description: Error al obtener las cartas filtradas.
 */
router.post("/carta/filtered/:page/:limit", cartaController.getCartasFilteredWithPagination);

/**
 * @swagger
 * /carta/aleatorias/{cantidad}/{arquetipo}:
 *   get:
 *     tags: [Carta]
 *     summary: Obtener una selección aleatoria de cartas
 *     description: Devuelve una selección aleatoria de cartas que coincidan con el arquetipo pasado como parámetro.
 *     parameters:
 *       - in: path
 *         name: cantidad
 *         required: true
 *         description: Número de cartas a obtener.
 *         schema:
 *           type: integer
 *       - in: path
 *         name: arquetipo
 *         required: true
 *         description: Arquetipo de las cartas a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Selección aleatoria de cartas obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Carta'
 *       400:
 *         description: Error al obtener las cartas aleatorias.
 */
router.get("/carta/aleatorias/:cantidad/:arquetipo", cartaController.getCartasAleatorias);

module.exports = router;
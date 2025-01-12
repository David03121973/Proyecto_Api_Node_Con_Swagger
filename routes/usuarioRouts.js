// routes/usuario.js

const express = require("express");
const router = express.Router();
// Etiqueta taks
// Importar controlador de usuario
const usuarioController = require("../controllers/usuarioController");
const authenticate = require("../helpers/authenticate");

/**
 * @swagger
 * tags:
 *   - name: Usuario
 *     description: Operaciones relacionadas con usuarios
 */

/**
 * @swagger
 * /Usuario/createUsuario:
 *   post:
 *     tags: [Usuario]
 *     summary: Crear un nuevo usuario
 *     description: Crea un nuevo usuario con la información proporcionada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_usuario:
 *                 type: string
 *               email:
 *                 type: string
 *               contrasenna:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 */
router.post("/Usuario/createUsuario", usuarioController.createUsuario);

/**
 * @swagger
 * /Usuario:
 *   get:
 *     tags: [Usuario]
 *     summary: Obtener todos los usuarios
 *     description: Devuelve una lista de todos los usuarios registrados.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente.
 */
router.get("/Usuario", authenticate(), usuarioController.getUsuarios);

/**
 * @swagger
 * /Usuario/{id}:
 *   get:
 *     tags: [Usuario]
 *     summary: Obtener un usuario por ID
 *     description: Devuelve un usuario específico usando su ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado.
 *       404:
 *         description: Usuario no encontrado.
 */
router.get("/Usuario/:id", authenticate(), usuarioController.getUsuarioById);

/**
 * @swagger
 * /Usuario/updateUsuario/{id}:
 *   put:
 *     tags: [Usuario]
 *     summary: Actualizar un usuario
 *     description: Actualiza la información de un usuario específico por ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_usuario:
 *                 type: string
 *               email:
 *                 type: string
 *               contrasenna:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente.
 *       404:
 *         description: Usuario no encontrado.
 */
router.put("/Usuario/updateUsuario/:id", authenticate(), usuarioController.updateUsuario);

/**
 * @swagger
 * /Usuario/deleteUsuario/{id}:
 *   delete:
 *     tags: [Usuario]
 *     summary: Eliminar un usuario
 *     description: Elimina un usuario específico por ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Usuario eliminado exitosamente.
 *       404:
 *         description: Usuario no encontrado.
 */
router.delete("/Usuario/deleteUsuario/:id", authenticate(), usuarioController.deleteUsuario);

/**
 * @swagger
 * /Usuario/login:
 *   post:
 *     tags: [Usuario]
 *     summary: Iniciar sesión
 *     description: Inicia sesión con un usuario y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_usuario:
 *                 type: string
 *               contrasenna:
 *                 type: string
 *     responses:
 *       200:
 *         description: Sesión iniciada correctamente.
 *       401:
 *         description: Contraseña incorrecta.
 *       404:
 *         description: Usuario no encontrado.
 */
router.post("/Usuario/login", usuarioController.login);

module.exports = router;

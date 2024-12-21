// controllers/usuarioController.js

const usuarioService = require('../services/usuarioService');
/**
 * Obtener todos los usuarios
 */
const getUsuarios = async (req, res) => {
    try {
        // Obtener los usuarios desde el servicio
        const usuarios = await usuarioService.getAllUsuarios();

        // Verificar si hay usuarios
        if (!usuarios || usuarios.length === 0) {
            return res.status(200).json([]); // Retornar un array vacío si no hay usuarios
        }

        return res.status(200).json(usuarios); // Retornar la lista de usuarios
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        return res.status(500).json({ message: "Error al obtener los usuarios", error });
    }
};

/**
 * Obtener un usuario por ID
 */
const getUsuarioById = async (req, res) => {
    const { id } = req.params; // Obtener el ID del usuario desde los parámetros
    try {
        const usuario = await usuarioService.getUsuarioById(id);

        // Verificar si el usuario fue encontrado
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        return res.status(200).json(usuario); // Retornar el usuario encontrado
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        return res.status(500).json({ message: "Error al obtener el usuario", error });
    }
};

/**
 * Crear un nuevo usuario
 */
const createUsuario = async (req, res) => {
    const { nombre_usuario, email, contrasenna } = req.body;

    // Validar entrada
    if (!nombre_usuario || !email || !contrasenna) {
        return res.status(400).json({
            message: "El nombre, email o contraseña no pueden ser nulos",
        });
    }

    // Verificar si el nombre de usuario ya existe
    const exists = await usuarioService.usuarioExists(nombre_usuario);
    if (exists) {
        return res.status(400).json({
            message: "El nombre de usuario ya está en uso.",
        });
    }
    // Verificar si el correo electrónico ya existe
    const emailExists = await usuarioService.emailExists(email);
    if (emailExists) {
        return res.status(400).json({
            message: "El correo electrónico ya está en uso.",
        });
    }

    const usuarioData = {
        nombre_usuario,
        email,
        contrasenna
    };
    
    try {
        // Aquí iría la lógica para crear el usuario
        const newUsuario = await usuarioService.createUsuario(usuarioData);
        return res.status(201).json(newUsuario);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error al crear el usuario: " + error.message
        });
    }
};

/**
 * Actualizar un usuario
 */
const updateUsuario = async (req, res) => {
    const { id } = req.params; // Obtener el ID del usuario desde los parámetros
    const { nombre_usuario, email, contrasenna } = req.body; // Obtener los datos a actualizar desde el cuerpo de la solicitud

    // Validar campos
    if (!nombre_usuario || !email || !contrasenna) {
        return res.status(400).json({ message: "El nombre_usuario, email, o contrasenna no pueden ser nulos" });
    }

    try {
        // Verificar si el usuario existe
        const usuarioData = await usuarioService.getUsuarioById(id);
        if (!usuarioData) {
            return res.status(404).json({ message: "No se ha encontrado el usuario con el id pasado por parámetros." });
        }

        // Verificar si el nombre de usuario ya existe (excluyendo el usuario actual)
        const userExists = await usuarioService.usuarioExists(nombre_usuario);
        if (userExists && usuarioData.nombre_usuario !== nombre_usuario) {
            return res.status(400).json({ message: "El nombre de usuario ya está en uso." });
        }

        // Verificar si el correo electrónico ya existe (excluyendo el usuario actual)
        const emailExists = await usuarioService.emailExists(email);
        if (emailExists && usuarioData.email !== email) {
            return res.status(400).json({ message: "El correo electrónico ya está en uso." });
        }

        // Preparar los datos para la actualización
        const dataToUpdate = {
            nombre_usuario,
            email,
            contrasenna
        };

        // Actualizar el usuario
        const updatedUsuario = await usuarioService.updateUsuario(id, dataToUpdate);
        if (!updatedUsuario) {
            return res.status(500).json({ message: "No se pudo actualizar el usuario. Verifique los datos." });
        }

        // Obtener el usuario actualizado
        const updatedUser  = await usuarioService.getUsuarioById(id);
        return res.status(200).json(updatedUser );
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        return res.status(500).json({ message: "Error al actualizar el usuario", error });
    }
};

/**
 * Eliminar un usuario
 */
const deleteUsuario = async (req, res) => {
    const { id } = req.params; // Obtener el ID del usuario desde los parámetros
    try {
        const result = await usuarioService.deleteUsuario(id);
        if (result) {
            return res.status(204).send(); // No content
        } else {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        return res.status(500).json({ message: "Error al eliminar el usuario", error });
    }
};

module.exports = {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
};
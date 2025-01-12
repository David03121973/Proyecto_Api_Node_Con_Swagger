// services/usuarioService.js

const  Usuario  = require("../models/usuario"); // Importar el modelo de usuario
const Resenna = require("../models/resenna");

/**
 * Obtener todos los usuarios
 */
const getAllUsuarios = async () => {
  try {
    return await Usuario.findAll({
      include: [{
        model: Resenna, // Asegúrate de importar el modelo Resenna
        required: false // Esto permite que los usuarios sin reseñas también sean devueltos
      }]
    });
  } catch (error) {
    console.log("Error en los servicios de getAllUsuarios: ", error);
    throw error; // Lanza el error para que el controlador pueda manejarlo
  }
};

/**
 * Obtener un usuario por ID
 */
const getUsuarioById = async (id) => {
  return await Usuario.findOne({
    where: { id_usuario: id },
    include: [{
      model: Resenna, // Cambia 'module' a 'model'
      required: false
    }]
  });
};

const usuarioExists = async (nombre_usuario) => {
  const usuario = await Usuario.findOne({ where: { nombre_usuario } });
  return usuario !== null; // Devuelve true si el usuario existe, false si no
};

const emailExists = async (email) => {
  const usuario = await Usuario.findOne({ where: { email } });
  return usuario !== null; // Devuelve true si el correo electrónico existe, false si no
};

/**
 * Crear un nuevo usuario
 */
const createUsuario = async (usuarioData) => {
  try {
    return await Usuario.create(usuarioData);
  } catch (error) {
    console.log("Error al en el servicio de crear usuario: ", error);
  }
};

/**
 * Actualizar un usuario
 */
const updateUsuario = async (id, userData) => {
  try {
    const usuario = await Usuario.findOne({ where: { id_usuario: id } });
    if (usuario) {
      await usuario.update(userData);
      return usuario;
    }
    return null;
  } catch (error) {
    console.log("Error en el servicio de actualizar usuario: ", error);
    throw error;
  }
};

/**
 * Eliminar un usuario
 */
const deleteUsuario = async (id) => {
  const usuario = await Usuario.findOne({
    where: { id_usuario: id },
    include: [{
      model: Resenna, // Incluir reseñas
      required: false
    }]
  });
  if (usuario) {
    await usuario.destroy();
    return usuario; // Retornar el usuario eliminado con sus reseñas
  }
  return null; // Si no se encuentra el usuario
};

const getUsuarioByNombreUsuario = async (nombre_usuario) => {
  try {
      return await Usuario.findOne({ where: { nombre_usuario } });
  } catch (error) {
      console.log("Error al obtener el usuario por nombre de usuario:", error);
      throw error;
  }
};

// Exportar las funciones
module.exports = {
  getAllUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  usuarioExists,
  emailExists,
  getUsuarioByNombreUsuario
};
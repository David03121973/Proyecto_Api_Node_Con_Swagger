// services/cartaService.js

const { normalizeString } = require("../helpers/normalize");
const { Op, Sequelize } = require("sequelize");
const Carta = require("../models/carta"); // Importar el modelo de carta

/**
 * Obtener todas las cartas
 */
const getAllCartas = async () => {
    try {
        return await Carta.findAll(); // Devuelve todas las cartas
    } catch (error) {
        console.log("Error en los servicios de getAllCartas: ", error);
        throw error; // Lanza el error para que el controlador pueda manejarlo
    }
};
/**
 * Obtener cartas con paginación
 */
const getCartasWithPagination = async (page, limit) => {
    const offset = (page - 1) * limit; // Calcular el desplazamiento
    try {
        const cartas = await Carta.findAll({
            limit: limit, // Limitar el número de resultados
            offset: offset // Desplazamiento para la paginación
        });

        const totalCartas = await Carta.count(); // Obtener el total de cartas en la base de datos
        const totalPages = Math.ceil(totalCartas / limit); // Calcular el total de páginas

        return {
            cartas,
            totalCartas,
            totalPages
        };
    } catch (error) {
        console.log("Error en los servicios de getCartasWithPagination: ", error);
        throw error; // Lanza el error para que el controlador pueda manejarlo
    }
};

/**
 * Obtener una carta por ID
 */
const getCartaById = async (id) => {
    try {
        return await Carta.findOne({
            where: { id_carta: id } // Busca la carta por ID
        });
    } catch (error) {
        console.log("Error en los servicios de getCartaById: ", error);
        throw error; // Lanza el error para que el controlador pueda manejarlo
    }
};

/**
 * Crear una nueva carta
 */
const createCarta = async (cartaData) => {
    try {
        return await Carta.create(cartaData); // Crea una nueva carta
    } catch (error) {
        console.log("Error en el servicio de crear carta: ", error);
        throw error; // Lanza el error para que el controlador pueda manejarlo
    }
};

/**
 * Actualizar una carta
 */
const updateCarta = async (id, cartaData) => {
    try {
        const carta = await Carta.findOne({ where: { id_carta: id } });
        if (carta) {
            return await carta.update(cartaData); // Actualiza la carta si se encuentra
        }
        return null; // Si no se encuentra la carta
    } catch (error) {
        console.log("Error en el servicio de actualizar carta: ", error);
        throw error; // Lanza el error para que el controlador pueda manejarlo
    }
};

/**
 * Eliminar una carta
 */
const deleteCarta = async (id) => {
    try {
        const carta = await Carta.findOne({ where: { id_carta: id } });
        if (carta) {
            return await carta.destroy(); // Elimina la carta si se encuentra
        }
        return null; // Si no se encuentra la carta
    } catch (error) {
        console.log("Error en el servicio de eliminar carta: ", error);
        throw error; // Lanza el error para que el controlador pueda manejarlo
    }
};

/**
 * Obtener cartas filtradas con paginación
 */
const getCartasFilteredWithPagination = async (page, limit, filters) => {
    const offset = (page - 1) * limit; // Calcular el desplazamiento

    try {
        const whereClause = {};

        // Aplicar filtros si están presentes
        if (filters.nombre) {
            const normalizedNombre = normalizeString(filters.nombre);
            whereClause.nombre = {
                [Op.iLike]: `%${normalizedNombre}%`, // Búsqueda parcial insensible a mayúsculas y tildes
            };
        }
        if (filters.tipo) {
            const normalizedTipo = normalizeString(filters.tipo);
            whereClause.tipo = {
                [Op.iLike]: `%${normalizedTipo}%`, // Búsqueda parcial insensible a mayúsculas y tildes
            };
        }
        if (filters.arquetipo) {
            const normalizedArquetipo = normalizeString(filters.arquetipo);
            whereClause.arquetipo = {
                [Op.iLike]: `%${normalizedArquetipo}%`, // Búsqueda parcial insensible a mayúsculas y tildes
            };
        }

        // Obtener las cartas filtradas
        const cartas = await Carta.findAll({
            where: whereClause,
            limit: limit,
            offset: offset,
        });

        // Contar el total de cartas que coinciden con los filtros
        const totalCartas = await Carta.count({ where: whereClause });
        const totalPages = Math.ceil(totalCartas / limit);

        return {
            cartas,
            totalCartas,
            totalPages,
        };
    } catch (error) {
        console.log("Error en los servicios de getCartasFilteredWithPagination: ", error);
        throw error;
    }
};

const getCartasAleatorias = async (cantidad, arquetipo) => {
    try {
      // Obtener todas las cartas que coincidan con el arquetipo
      const cartasArquetipo = await Carta.findAll({
        where: {
          arquetipo: arquetipo,
        },
      });
  
      // Verificar si hay cartas que coincidan con el arquetipo
      if (!cartasArquetipo || cartasArquetipo.length === 0) {
        return [];
      }
  
      // Obtener una selección aleatoria de cartas que coincidan con el arquetipo
      const cartasAleatoriasArquetipo = [];
      for (let i = 0; i < Math.min(cantidad, cartasArquetipo.length); i++) {
        const indiceAleatorio = Math.floor(Math.random() * cartasArquetipo.length);
        cartasAleatoriasArquetipo.push(cartasArquetipo[indiceAleatorio]);
        cartasArquetipo.splice(indiceAleatorio, 1); // Eliminar la carta seleccionada para evitar duplicados
      }
  
      // Si el número de cartas aleatorias que coincidan con el arquetipo es menor que la cantidad solicitada,
      // obtener una selección aleatoria de cartas para completar las cartas que faltan
      if (cartasAleatoriasArquetipo.length < cantidad) {
        const cartasAleatoriasRestantes = await Carta.findAll({
          where: {
            arquetipo: {
              [Op.ne]: arquetipo,
            },
          },
          order: [
            [Sequelize.fn('RANDOM')], // Ordenar aleatoriamente
          ],
          limit: cantidad - cartasAleatoriasArquetipo.length,
        });
        cartasAleatoriasArquetipo.push(...cartasAleatoriasRestantes);
      }
  
      return cartasAleatoriasArquetipo;
    } catch (error) {
      console.error("Error al obtener las cartas aleatorias:", error);
      throw error; // Lanza el error para que el controlador pueda manejarlo
    }
  };

module.exports = {
    getAllCartas,
    getCartaById,
    createCarta,
    updateCarta,
    deleteCarta,
    getCartasWithPagination,
    getCartasFilteredWithPagination,
    getCartasAleatorias
};
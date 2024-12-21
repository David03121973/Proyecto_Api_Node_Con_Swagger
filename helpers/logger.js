// helpers/logger.js

const winston = require('winston');

// Crear un logger
const logger = winston.createLogger({
    level: 'info', // Nivel mínimo de mensajes a registrar
    format: winston.format.combine(
        winston.format.timestamp(), // Agregar timestamp
        winston.format.json() // Formato JSON para los mensajes
    ),
    transports: [
        new winston.transports.Console(), // Imprimir en la consola
        new winston.transports.File({ filename: 'logs/app.log' }) // Guardar en un archivo
    ],
});

// Exportar el logger
module.exports = logger;
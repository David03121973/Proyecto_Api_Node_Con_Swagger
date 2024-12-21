// app.js

const express = require("express");
const cors = require('cors');
const logger = require("./helpers/logger.js")
const sequelize = require("./helpers/database.js");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const Usuario = require("./models/usuario.js")
const Resenna = require("./models/resenna.js")
const Carta = require("./models/carta.js")
const Venta = require("./models/venta.js")

// Importar rutas
const usuarioRoutes = require("./routes/usuarioRouts.js");
const resennaRouts = require("./routes/resennaRouts.js");
const cartaRouts = require("./routes/cartaRouts.js");
const ventaRouts = require("./routes/ventaRouts.js");

const app = express();

// Middleware de Express
app.use(express.json());  // Para poder parsear cuerpos JSON

// Middleware de registro de solicitudes
app.use((req, res, next) => {
  logger.info(`Solicitud recibida: ${req.method} ${req.url}`); // Usar el logger
  next(); // Llama al siguiente middleware o ruta
});

// Configuración de CORS
const corsOptions = {
  origin: 'http://localhost:5000', // Permitir solo solicitudes desde este origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
};

// Habilitar CORS con las opciones configuradas
app.use(cors(corsOptions));

// Middleware de registro de solicitudes
const loggerMiddleware = (req, res, next) => {
  const now = new Date(); // Obtener la fecha y hora actuales
  const formattedDate = now.toISOString(); // Formatear la fecha en formato ISO 8601
  console.log(`[${formattedDate}] Solicitud recibida: ${req.method} ${req.url}`);
  next(); // Llama al siguiente middleware o ruta
};

// Usar el middleware de registro en todas las rutas
app.use(loggerMiddleware);

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // Versión de OpenAPI
    info: {
      title: "API de Web de Venta de Cartas", // Título de la API
      version: "1.0.0", // Versión de la API
      description: "Documentación de la API para manejar usuarios", // Descripción
    },
  },
  apis: ["./routes/*.js"], // Especificar dónde están las rutas para generar la documentación
};

// Inicializar Swagger
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Usar las rutas de usuario
app.use("", usuarioRoutes);
app.use("", resennaRouts);
app.use("", cartaRouts);
app.use("", ventaRouts);

// Sincronizar la base de datos y arrancar el servidor
const startApp = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Tablas sincronizadas.");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al sincronizar las tablas:", error);
  }
};

startApp();

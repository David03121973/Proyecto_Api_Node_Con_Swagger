// helpers/swagger.js

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Ventas de Cartas de Yu-Gi-Oh",
      version: "1.0.0",
      description: "API para gestionar compras y ventas de cartas",
    },
  },
  apis: ["./routes/*.js"],  // Ruta donde Swagger buscará las definiciones de las rutas
};

const specs = swaggerJsdoc(options);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};

module.exports = setupSwagger;

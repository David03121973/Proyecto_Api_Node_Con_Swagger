// database.js
const Sequelize = require('sequelize');

// Crear una instancia de Sequelize
const sequelize = new Sequelize('Ventas_web_cartas', 'postgres', 'pg', {
  host: 'localhost', // o la dirección de tu servidor de base de datos
  dialect: 'postgres',
  logging: false,
});

// Probar la conexión
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

testConnection();

module.exports = sequelize;

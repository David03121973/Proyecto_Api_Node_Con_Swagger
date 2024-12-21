// models/usuario.js
const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database.js");
const Resenna = require("./resenna.js");

const Usuario = sequelize.define("usuario", {
  id_usuario: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  contrasenna: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoid: true,
});

// Definir la relación
Usuario.hasMany(Resenna, { foreignKey: 'id_usuario' }); // Un usuario puede tener muchas reseñas
Resenna.belongsTo(Usuario, { foreignKey: 'id_usuario' }); // Una reseña pertenece a un usuario

module.exports = Usuario;
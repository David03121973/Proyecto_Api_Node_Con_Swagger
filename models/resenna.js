// models/resenna.js
const DataTypes = require("sequelize");
const sequelize = require("../helpers/database.js");

const Resenna = sequelize.define("resenna", {
  id_resenna: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valoracion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "usuarios", // Asegúrate de que coincida con el nombre de la tabla asociada
      key: "id_usuario",
    },
    onDelete: "CASCADE",
  },
}, {
  timestamps: true,
  paranoid: true,
});

module.exports = Resenna;
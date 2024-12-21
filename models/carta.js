// models/carta.js

const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database.js");

const Carta = sequelize.define("carta", {
    id_carta: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true, // Puede ser nulo
    },
    raza: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    arquetipo: {
        type: DataTypes.STRING,
        allowNull: true, // Puede ser nulo
    },
    imagen: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true, // Agrega columnas createdAt y updatedAt
    paranoid: true,  // Agrega la columna deletedAt
});

module.exports = Carta;
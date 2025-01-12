const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database.js");

const Carta = sequelize.define("carta", {
    id_carta: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.TEXT(255),
        allowNull: false,
    },
    tipo: {
        type: DataTypes.TEXT(255),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT(255),
        allowNull: true,
    },
    raza: {
        type: DataTypes.TEXT(255),
        allowNull: false,
    },
    arquetipo: {
        type: DataTypes.TEXT(255),
        allowNull: true,
    },
    imagen: {
        type: DataTypes.TEXT(255),
        allowNull: false,
    },
}, {
    timestamps: true,
    paranoid: true,
});

module.exports = Carta;
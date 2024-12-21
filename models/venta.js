// models/venta.js

const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/database.js");
const Usuario = require("./usuario.js");
const Carta = require("./carta.js"); // Asegúrate de que la extensión sea .js

const Venta = sequelize.define("venta", {
    id_venta: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id_carta: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Carta, // Modelo relacionado
            key: "id_carta", // Clave primaria de la tabla cartas
        },
        onDelete: "CASCADE", // Elimina la venta si la carta asociada se elimina
    },
    id_usuario_vendedor: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario, // Modelo relacionado
            key: "id_usuario", // Clave primaria de la tabla usuarios
        },
        onDelete: "CASCADE", // Elimina la venta si el vendedor asociado se elimina
    },
    id_usuario_comprador: {
        type: DataTypes.INTEGER,
        allowNull: true, // Puede ser nulo mientras no se realice la venta
        references: {
            model: Usuario, // Modelo relacionado
            key: "id_usuario", // Clave primaria de la tabla usuarios
        },
        onDelete: "SET NULL", // Si el comprador es eliminado, el campo queda nulo
    },
    precio_venta: {
        type: DataTypes.DECIMAL(10, 2), // Precio con dos decimales
        allowNull: false,
        validate: {
            min: 0.01, // Mínimo valor de venta
        },
    },
    fecha_venta: {
        type: DataTypes.DATE,
        allowNull: true, // Puede ser nulo si aún no se concreta la venta
    },
}, {
    timestamps: true, // Crea columnas createdAt y updatedAt
    paranoid: true,  // Crea columna deletedAt para borrado lógico
});

// Definir las asociaciones
Venta.belongsTo(Carta, { foreignKey: 'id_carta', as: "carta" }); // Una venta pertenece a una carta
Venta.belongsTo(Usuario, { foreignKey: 'id_usuario_vendedor', as: 'vendedor' }); // Una venta pertenece a un vendedor
Venta.belongsTo(Usuario, { foreignKey: 'id_usuario_comprador', as: 'comprador' }); // Una venta puede tener un comprador

module.exports = Venta;
const { DataTypes } = require("sequelize");
const sequelize = require("../db/mysql");
const User = require("./userModel");
const Service = require("./serviceModel");
const Provider = require("./providerModel");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Service,
        key: "id",
      },
    },
    providerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Provider,
        key: "id",
      },
    },
    street: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    zipcode: {
      type: DataTypes.STRING,
    },
    task: {
      type: DataTypes.TEXT,
    },
    demand: {
      type: DataTypes.STRING,
    },
    vehicleNeeded: {
      type: DataTypes.STRING,
    },
    aptDate: {
      type: DataTypes.DATE,
    },
    aptTime: {
      type: DataTypes.STRING,
    },
    supportFee: {
      type: DataTypes.DOUBLE,
    },
    tax: {
      type: DataTypes.DOUBLE,
    },
    total: {
      type: DataTypes.DOUBLE,
    },
    orderedDate: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

Order.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
  onDelete: "CASCADE",
});
Order.belongsTo(Service, {
  foreignKey: "serviceId",
  as: "service",
  onDelete: "CASCADE",
});
Order.belongsTo(Provider, {
  foreignKey: "providerId",
  as: "provider",
  onDelete: "CASCADE",
});

module.exports = Order;

const { DataTypes } = require("sequelize");
const sequelize = require("../db/mysql");
const User = require("./userModel");
const Service = require("./serviceModel");
const Provider = sequelize.define(
  "Provider",
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
    hourly_rate: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "100",
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 5,
    },
    reviews: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 0,
    },
    aboutme: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Active",
    },
  },
  {
    timestamps: true,
  }
);
Provider.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
  onDelete: "CASCADE",
});
Provider.belongsTo(Service, {
  foreignKey: "serviceId",
  as: "service",
  onDelete: "CASCADE",
});
module.exports = Provider;

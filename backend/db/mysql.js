const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("repairmate", "root", "root@123", {
  host: "localhost",
  dialect: "mysql",
});

const synchronizeDatabase = async () => {
  try {
    const databaseExists = await sequelize.query(
      `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'repairmate'`
    );

    if (databaseExists[0].length === 0) {
      await sequelize.query("CREATE DATABASE IF NOT EXISTS repairmate;");
      console.log("Database 'repairmate' created");
    }

    await sequelize.sync({ force: false });
    console.log("Database synchronized");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
};

synchronizeDatabase();

module.exports = sequelize;

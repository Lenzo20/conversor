import Sequelize, { DataTypes } from "sequelize";

import { sequelize } from "../database";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  idUser: {
    type: Sequelize.STRING,
  },
  originCurrency: {
    type: Sequelize.STRING,
  },
  originValue: {
    type: Sequelize.INTEGER,
  },
  destinationCurrency: {
    type: Sequelize.STRING,
  },
  conversionRate: {
    type: Sequelize.INTEGER,
  }
}, {
  timestamps: true,
});

// sequelize.sync({ alter: true })
//   .then(() => console.log("Tabela criada com sucesso"))
//   .catch(error => console.error(error));


export { User };

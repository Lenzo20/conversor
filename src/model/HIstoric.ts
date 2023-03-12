import Sequelize, { DataTypes } from "sequelize";

import { sequelize } from "../database";

const Historic = sequelize.define("Historic", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  idUser: {
    type: Sequelize.STRING,
  },
  idTransiction: {
    type: Sequelize.STRING,
  },
  originCurrency: {
    type: Sequelize.STRING,
  },
  originValue: {
    type: Sequelize.NUMBER,
  },
  destinationCurrency: {
    type: Sequelize.STRING,
  },
  destinationValue: {
    type: Sequelize.NUMBER,
  },
  conversionRate: {
    type: Sequelize.NUMBER,
  },
  create_date: {
    type: Sequelize.DATE,
  }
}, {
  timestamps: true,
});

export { Historic };

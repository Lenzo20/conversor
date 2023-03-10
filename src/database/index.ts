import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("conversor", "postgres", "Ozielbenny200*", {
  host: "localhost",
  dialect: "postgres",
  port: 5432, // porta padrão do PostgreSQL
});

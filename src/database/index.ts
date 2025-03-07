import { Sequelize } from "sequelize";
import { ENVIRONMENT } from "../constants/index.js";
import config from "../database/config/config.js";

const environment = config[ENVIRONMENT];

export const sequelize = new Sequelize({
  dialect: "postgres",
  database: environment.database,
  username: environment.username,
  password: environment.password,
  host: environment.host,
  port: environment.port,
});

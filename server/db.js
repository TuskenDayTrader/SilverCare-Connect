import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Switch dialect to "sqlite" and add storage for local dev without MySQL:
//   dialect: "sqlite",
//   storage: "./database.sqlite",
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

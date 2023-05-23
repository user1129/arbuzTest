import express from "express";
import dotenv from "dotenv";
import sequelize from "./db.js";
import {createProduct, createSubscribe, createUser} from './controllers/main.js'

const app = express();
app.use(express.json());
dotenv.config();

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(process.env.PORT, (err) => {
      if (err) {
        return console.log(err);
      }
      console.log("Server started on port ", process.env.PORT);
    });

    app.post("/subscribe", createSubscribe) //Главный роут для создания подписки

    app.post("/users", createUser); //Это тестовый роут чтобы накидать в базу несколько пользователей

    app.post("/product", createProduct); //Это тестовый роут чтобы накидать в базу несколько продуктов
  
  } catch (e) {
    console.log(e);
  }
};

start();

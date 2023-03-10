import cors from "cors";
import express from "express";

import RedisService from "./config/redis";
import { sequelize } from "./database";
import { router } from "./router/router";

class App {
  public express = express.application;

  public constructor() {
    this.express = express();

    this.middlewares();
    this.database();
    this.router();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private database(): void {
    sequelize;
    RedisService;
  }

  private router(): void {
    this.express.use(router);
  }
}

export default new App().express;

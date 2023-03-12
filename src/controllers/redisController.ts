import { Request, Response } from "express";
import { Redis } from "ioredis";

import userController from "./userController";

// Busca no cache se tem algum valor se não ele busca no banco main e salva no cache que salva por 30seg
class redisController {
  public async index(req: Request, res: Response) {
    const redis = new Redis();
    // Buscar nno redis para ver se tem algo
    const cacheUsers = await redis.get("users");

    if (!cacheUsers) {

      console.log(".\x1b[35m%s\x1b[0m", "From Database");
      const users = await userController.index(req, res);

      const newUsers = users.users;

      await redis.set("users", JSON.stringify(newUsers), "EX", 30);

      return res.json(newUsers);
    }
    console.log(".\x1b[36m%s\x1b[0m", "From Cache");
    const cacheUsersJson = JSON.parse(cacheUsers);
    return res.json(cacheUsersJson);
  }

  // Cache search first, then main database with 50-second cache save
  public async indexHistoric(req: Request, res: Response) {
    const redis = new Redis();
    // Search in Redis to see if there is something.
    const cacheHistoric = await redis.get("Historic");

    //  If no value, searches in the main database.
    if (!cacheHistoric) {

      console.log(".\x1b[35m%s\x1b[0m", "From Database");
      const historic = await userController.historic(req, res);

      const newHistoric = historic;

      await redis.set("Historic", JSON.stringify(newHistoric), "EX", 50);

      return res.json(newHistoric);
    }
    console.log(".\x1b[36m%s\x1b[0m", "From Cache");
    const cacheHistoricJson = JSON.parse(cacheHistoric);
    return res.json(cacheHistoricJson);
  }
}

export default new redisController();

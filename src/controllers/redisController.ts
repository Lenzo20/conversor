import { Request, Response } from "express";
import { Redis } from "ioredis";

import userController from "./userController";

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
}

export default new redisController();

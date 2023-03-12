import { Request, Response } from "express";

import redis from "../config/redis";
import { Historic } from "../model/HIstoric";
import { User } from "../model/User";
import { conversor } from "./apiConversor";
import { saveHistoric } from "./historic";

class userController {
  public async index(_req: Request, _res: Response) {
    const users = await User.findAll();

    return { users };
  }

  public async store(req: Request, res: Response) {
    try {
      const { originCurrency, originValue, destinationCurrency } = req.body;
      const { iduser } = req.headers;

      const users = await User.create({
        originCurrency: originCurrency,
        originValue: originValue,
        destinationCurrency: destinationCurrency,
        conversionRate: 100,
        idUser: iduser
      });


      await redis.set("users", JSON.stringify(await User.findAll()), "EX", 80);

      const result = await conversor(users);


      if (!result)
        return res.status(400).json({ error: "Error em converter a moeda" });

      // "Saving data for historical control."
      const historic = await saveHistoric(result.newArray);
      return res.json(historic);
    }
    catch (err) {
      return res.json({ error: err });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.body;

      if (!await User.findByPk(id))
        return res.json({ error: "User not found" });

      await User.destroy({
        truncate: true
      });
      return res.json({ message: "Successfully deleted" });
    } catch (err) {
      return res.json({ error: err });
    }
  }

  // Search in historical database with filters
  public async historicUser(req: Request, res: Response) {
    try {
      const { iduser } = req.headers;

      const users = await Historic.findAll({
        where: {
          idUser: iduser
        }
      });

      return res.json(users);
    } catch (err) {
      console.log(err);
      res.json({ error: "idUser not found" });
    }
  }

  // Search in the history database
  public async historic(_req: Request, res: Response) {
    try {
      const users = await Historic.findAll();

      return { users };
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
}

export default new userController();

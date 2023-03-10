import { Request, Response } from "express";

import { User } from "../model/User";

class userController {
  public async index(req: Request, res: Response) {
    const users = await User.findAll();

    return res.json(users);
  }

  public async store(req: Request, res: Response) {
    try {
      const { originCurrency, originValue, destinationCurrency } = req.body;
      const { iduser } = req.headers;

      const array = [
        { "originCurrency": originCurrency },
        { "originValue": originValue || null },
        { "destinationCurrency": destinationCurrency || null },
      ];

      console.log(array);

      const users = await User.create({
        originCurrency: originCurrency,
        originValue: originValue,
        destinationCurrency: destinationCurrency,
        conversionRate: 100,
        idUser: iduser
      });

      return res.json(users);
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

  public async historic(req: Request, res: Response) {
    try {
      const { iduser } = req.headers;

      const users = await User.findAll({
        where: {
          idUser: iduser
        }
      });

      return res.json(users);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
}

export default new userController();

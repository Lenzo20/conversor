import { Router } from "express";
import redisController from "../../controllers/redisController";
import userController from "../../controllers/userController";
import { test } from "../../test/teste";

const routerAdmin = Router();

routerAdmin.get("/test", (req, res) => {
  return res.status(200).json({ message: "Hello world!" });
});

routerAdmin.post("/test", test);

routerAdmin.get("/user", redisController.index);
routerAdmin.get("/historic", redisController.indexHistoric);
routerAdmin.post("/user", userController.store);
routerAdmin.delete("/user", userController.delete);

export { routerAdmin };

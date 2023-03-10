import { Router } from "express";

import { test } from "../controllers/teste";
import userController from "../controllers/userController";

const router = Router();

router.get("/test", (req, res) => {
  return res.status(200).json({ message: "Hello world!" });
});

router.post("/test", test);

router.get("/user", userController.index);
router.post("/user", userController.store);
router.delete("/user", userController.delete);
router.get("/historic", userController.historic);

export { router };

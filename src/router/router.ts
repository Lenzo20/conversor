import { Router } from "express";

import userController from "../controllers/userController";

const router = Router();

router.get("/test", (req, res) => {
  return res.status(200).json({ message: "Hello world!" });
});

router.post("/user", userController.store);
router.get("/historic", userController.historic);

export { router };

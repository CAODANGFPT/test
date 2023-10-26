import { Router } from "express";
import { listUser, create, update, destroy } from "../controllers/orders";

const router = Router();

router.get("/orders/:id", listUser);
router.post("/orders", create);
router.put("/orders/:id", update);
router.delete("/orders/:id", destroy);
export default router;

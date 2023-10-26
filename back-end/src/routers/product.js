import { Router } from "express";
import { create, list, destroy, show, update, listTop6 } from "../controllers/product";
import { checkPermission } from "../middlewares/checkPermission";

const router = Router();

router.get("/products", list);
router.get("/productsTop6", listTop6);
router.get("/products/:id", show);
router.post("/products",checkPermission, create);
router.patch("/products/:id",checkPermission, update);
router.delete("/products/:id",checkPermission, destroy);
export default router;

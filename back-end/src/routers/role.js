import { Router } from "express";
import { create, list, destroy, show, update } from "../controllers/role";
import { checkPermission } from "../middlewares/checkPermission";

const router = Router();

router.get("/role", list);
router.get("/role/:id", show);
router.post("/role",checkPermission, create);
router.patch("/role/:id",checkPermission, update);
router.delete("/role/:id",checkPermission, destroy);
export default router;

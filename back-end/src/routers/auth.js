import express from "express";
import {
  Login,
  Register,
  list,
  listUser,
  resetPassword,
  sendResetLinkEmail,
  show,
  update
} from "../controllers/auth";
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.post("/password/email", sendResetLinkEmail);
router.post("/password/reset", resetPassword);
router.get("/user", list);
router.get("/user/:id", show);
router.put("/user/:id",checkPermission, update);
router.get("/list/user", listUser);

export default router;

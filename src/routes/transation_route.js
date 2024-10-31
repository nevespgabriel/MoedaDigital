import { Router } from "express";
import transation_controller from "../controllers/transation_controller.js";
import authenticator from "../middlewares/jwt_authenticator.js";

const router = Router();

router.use(authenticator);

router.post("/transfer", transation_controller.storeTransfer);
router.post("/deposit", transation_controller.storeDeposit);
router.post("/withdraw", transation_controller.storeWithdraw);

export default router;
import { Router } from "express";
import user_controller from "../controllers/user_controller.js";
import authorizer from "../middlewares/authorizer.js";
import jwt_authenticator from "../middlewares/jwt_authenticator.js";

const router = Router();

router.post("/signup", user_controller.signup);
router.post("/login", user_controller.login);

router.use(jwt_authenticator);

router.get("/listTransations", user_controller.listTransations);
router.get("/showCash", user_controller.showCash);
router.put("/", user_controller.update);
router.post("/inactivateAccount", user_controller.inactivateAccount);

router.use(authorizer);

router.post("/", user_controller.store);
router.get("/", user_controller.index);
router.delete("/:id", user_controller.destroy);

export default router;
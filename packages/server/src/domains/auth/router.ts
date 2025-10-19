import { RequestHandler, Router } from "express";
import { checkFirstUser, loginUser, logoutUser, registerUser } from "./controller";
import { validateUserLoginInput, validateUserRegisterInput } from "../../middlewares/authValidators";

const authRouter = Router();

authRouter.post("/register", validateUserRegisterInput as RequestHandler, registerUser as RequestHandler);
authRouter.post("/login", validateUserLoginInput as RequestHandler, loginUser as RequestHandler);
authRouter.get("/logout", logoutUser as RequestHandler);
authRouter.get("/check-first-user", checkFirstUser as RequestHandler);

export { authRouter };

import  express  from "express";
import { handleValidation, valdateLogin, validateRegistration } from "../validator/auth.validation";
import { loginController, singupController } from "../controller/authentication.controller";

export const authRouter = express.Router();

authRouter.post ('/signup', validateRegistration, handleValidation, singupController );
authRouter.post('/signin', valdateLogin, handleValidation, loginController);


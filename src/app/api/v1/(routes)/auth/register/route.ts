import { AuthController } from "../../../controllers";
import { RequestHandler } from "../../../utils";

const authController = new AuthController();

export const POST = RequestHandler(authController.register.bind(authController));

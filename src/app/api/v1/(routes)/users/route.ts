import { UserController } from "../../controllers";
import { RequestHandler } from "../../utils";
import { AuthMiddleware } from "../../middlewares";

const userController = new UserController();
const authMiddleware = new AuthMiddleware();

export const GET = RequestHandler(
  authMiddleware.verifyToken.bind(authMiddleware),
  authMiddleware.verifyAdmin.bind(authMiddleware),
  userController.findMany.bind(userController)
);
export const POST = RequestHandler(
  authMiddleware.verifyToken.bind(authMiddleware),
  authMiddleware.verifyAdmin.bind(authMiddleware),
  userController.create.bind(userController)
);

import { UserController } from "../../../controllers";
import { RequestHandler } from "../../../utils";
import { AuthMiddleware } from "../../../middlewares";

const userController = new UserController();
const authMiddleware = new AuthMiddleware();

export const GET = RequestHandler(
  authMiddleware.verifyToken.bind(authMiddleware),
  authMiddleware.verifyAdmin.bind(authMiddleware),
  userController.findById.bind(userController)
);
export const PATCH = RequestHandler(
  authMiddleware.verifyToken.bind(authMiddleware),
  authMiddleware.verifyAdmin.bind(authMiddleware),
  userController.updateById.bind(userController)
);
export const DELETE = RequestHandler(
  authMiddleware.verifyToken.bind(authMiddleware),
  authMiddleware.verifyAdmin.bind(authMiddleware),
  userController.deleteById.bind(userController)
);

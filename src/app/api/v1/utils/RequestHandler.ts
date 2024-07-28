import { type NextRequest } from "next/server";
import { errorHandler } from "./ErrorHandler";

export const RequestHandler = (...middlewares: Function[]) => {
  return async (req: NextRequest, args: any) => {
    try {
      const handler = middlewares[middlewares.length - 1];
      for (let i = 0; i < middlewares.length - 1; i++) {
        await middlewares[i](req, args);
      }
      return await handler(req, args);
    } catch (error) {
      return errorHandler(error);
    }
  };
};

import { type NextRequest, NextResponse } from "next/server";
import { errorHandler } from "./ErrorHandler";

export const RequestHandler = (...middlewares: Function[]) => {
  return async (req: NextRequest, args: any) => {
    try {
      for (const middleware of middlewares) {
        const response = await middleware(req, args);
        if (response) return response;
      }
      return NextResponse.next();
    } catch (error) {
      return errorHandler(error);
    }
  };
};

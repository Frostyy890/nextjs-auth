import { NextResponse } from "next/server";
import { ApiError } from "next/dist/server/api-utils";

export function errorHandler(error: any) {
  if (error instanceof ApiError) {
    return NextResponse.json({ error: error.message }, { status: error.statusCode });
  }
  if (error.code && error.code === "ER_DUP_ENTRY") {
    return NextResponse.json({ error: error.message }, { status: 409 });
  }
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}

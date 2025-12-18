import { auth } from "@repo/auth/server";
import { toNextJsHandler } from "@repo/auth/server";

export const { POST, GET } = toNextJsHandler(auth);
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard","/results","/ranking","/groups","/predictions"],
};
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
      publicRoutes : ["/api/:path*" , "/api/store/:path*"]
});
 
export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 
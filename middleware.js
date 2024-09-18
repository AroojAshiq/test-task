export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard", "/dashboard/task-form", "/dashboard/edit-task"],
};

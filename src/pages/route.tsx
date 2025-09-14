import { createRootRoute, createRouter } from "@tanstack/react-router";
import { HomeRoute } from "./Home";
import { LoginRoute } from "./Login";
export const rootRoute = createRootRoute();

const routeTree = rootRoute.addChildren([HomeRoute, LoginRoute]);
export const router = createRouter({ routeTree });

//

function withoutAsConst() {
  const routes = {
    home: "/",
    admin: "/admin",
    users: "/users",
  };
  /**
  const routes: {
    home: string;
    admin: string;
    users: string;
  }
 */

  routes.admin = "/whatever";

  const goToRoute = (route: "/" | "/admin" | "/users") => {};

  goToRoute("/");

  // @ts-expect-error: cause TS infer admin is string (admin could be changed)
  goToRoute(routes.admin);
}

function withAsConst() {
  const routes = {
    home: "/",
    admin: "/admin",
    users: "/users",
  } as const; // ! <--- HERE!!
  /**
  const routes: {
    readonly home: "/";
    readonly admin: "/admin";
    readonly users: "/users";
  }
 */

  // @ts-expect-error: cause routes is Constized with "as const"
  routes.admin = "/whatever";

  type RouteKeys = keyof typeof routes;
  type Route = (typeof routes)[RouteKeys];

  const goToRoute = (route: Route) => {};

  goToRoute("/");

  goToRoute(routes.admin);

  // ! as const is like Object.freeze (deep freeze)
}

import { AdminPanel } from "./modules/Admin";
import { Home } from "./modules/Home";
import { Policy } from "./modules/Policy";
import { Terms } from "./modules/Terms";

export default [
  {
    path: "/",
    Component: Home,
    exact: true
  },
  {
    path: "/admin",
    Component: AdminPanel
  },
  {
    path: "/policy",
    Component: Policy,
    componentProps: {
      authType: "auth"
    }
  },
  {
    path: "/terms",
    Component: Terms,
    componentProps: {
      authType: "auth"
    }
  }
];

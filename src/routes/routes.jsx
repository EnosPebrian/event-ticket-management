import { Login } from "../components/login";
import Register from "../components/register";
import Eventdisplay from "../pages/event-display";
import { SearchPage } from "../pages/search-page";
import SingleEventDisplay from "../pages/single-event-display";
import { ProtectedPage } from "./protectedpage";
class RouteClass {
  constructor(path, element) {
    this.path = path;
    this.element = element;
  }
}

export const routes = [
  new RouteClass(
    "/home",
    (
      <ProtectedPage guestOnly={true}>
        <Eventdisplay />
      </ProtectedPage>
    )
  ),
  
  new RouteClass(
    "/:eventid/:eventname",
    (
      <ProtectedPage guestOnly={true}>
        <SingleEventDisplay />
      </ProtectedPage>
    )
  ),
  new RouteClass(
    "search/:searchkey",
    (
      <ProtectedPage guestOnly={true}>
        <SearchPage />
      </ProtectedPage>
    )
  ),
  new RouteClass(
    "register",
    (
      <ProtectedPage guestOnly={true}>
        <Register />
      </ProtectedPage>
    )
  ),
  new RouteClass(
    "login",
    (
      <ProtectedPage guestOnly={true}>
        <Login />
      </ProtectedPage>
    )
  ),
];

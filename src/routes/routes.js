import { Login } from "../components/login";
import Register from "../components/register";
import Eventdisplay from "../pages/event-display";
import { ProtectedPage } from "./protectedPage";

class RoutesClass {
  constructor(path, element) {
    this.path = path;
    this.element = element;
  }
}
export const routes = [
  new RoutesClass(
    "register",
    (
      <ProtectedPage guestOnly={true}>
        <Register />
      </ProtectedPage>
    )
  ),

  new RoutesClass(
    "login",
    (
      <ProtectedPage guestOnly={true}>
        <Login />
      </ProtectedPage>
    )
  ),
  new RoutesClass(
    "/",
    (
      <ProtectedPage>
        <Eventdisplay />
      </ProtectedPage>
    )
  ),
];

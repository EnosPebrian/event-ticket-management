import Redirect from "../components/Redirect";
import { Login } from "../components/login";
import Register from "../components/register";
import Eventdisplay from "../pages/event-display";
import { SearchPage } from "../pages/search-page";
import SingleEventDisplay from "../pages/single-event-display";
import { ProtectedPage } from "./protectedpage";
import { DashboardProfile } from "../pages/dashboardprofile";
import TopUp from "../pages/TopUp";
import { Toast } from "../components/toast";
import { ModalBuy } from "../components/modal-buy";
class RouteClass {
  constructor(path, element) {
    this.path = path;
    this.element = element;
  }
}

export const routes = [
  new RouteClass("/", <Redirect />),
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
  new RouteClass(
    "dashboardprofile",
    (
      <ProtectedPage guestOnly={false} needLogin={true}>
        <DashboardProfile />
      </ProtectedPage>
    )
  ),
  new RouteClass(
    "dashboardprofile/topup",
    (
      <ProtectedPage guestOnly={false} needLogin={true}>
        <TopUp />
      </ProtectedPage>
    )
  ),
  new RouteClass(
    "modalBuy",
    (
      <ProtectedPage guestOnly={false} needLogin={false}>
        <ModalBuy />
      </ProtectedPage>
    )
  ),
];

import { TestBed, async, inject } from "@angular/core/testing";

import { AuthGuard } from "./auth.guard";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AuthService } from "../auth/services/auth.service";
import { Router } from "@angular/router";

describe("AuthGuard", () => {
  let router: Router;
  const routerStateSnapShop = {
    url: ""
  };
  const activatedRouteSnapShot = {
    url: [{}],
    params: {},
    data: {},
    queryParams: {},
    outlet: "primary",
    fragment: null,
    component: "",
    routeConfig: {
      canActivate: jasmine.createSpy(),
      component: "",
      path: ""
    },
    parent: null,
    firstChild: null,
    root: {},
    children: {},
    pathFromRoot: {},
    queryParamMap: {}
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthGuard]
    });
  });

  it("should ...", inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it("should activate route if user is logged in", inject(
    [AuthGuard],
    (guard: AuthGuard) => {
      const authServiceSpy = jasmine.createSpyObj("AuthService", [
        "getCurrentUser"
      ]);
      authServiceSpy.getCurrentUser.and.returnValue(true);

      guard.canActivate(activatedRouteSnapShot, routerStateSnapShop);

      expect(guard.canActivate).toBeTruthy();
    }
  ));

  it("should deactivate route if user is not logged in", inject(
    [AuthGuard],
    (guard: AuthGuard) => {
      const authServiceSpy = jasmine.createSpyObj("AuthService", [
        "getCurrentUser"
      ]);
      authServiceSpy.getCurrentUser.and.returnValue(false);

      guard.canActivate(activatedRouteSnapShot, routerStateSnapShop);

      expect(guard.canActivate).toBeTruthy();
    }
  ));
});

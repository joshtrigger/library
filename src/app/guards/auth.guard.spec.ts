import { AuthGuard } from "./auth.guard";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

describe("AuthGuard", () => {
  let guard: AuthGuard;

  it("should activate route if user is logged in", () => {
    const authServiceSpy = jasmine.createSpyObj("AuthService", [
      "getCurrentUser"
    ]);
    const routerSpy = jasmine.createSpyObj("router", ["navigate"]);
    const snackBarSpy = jasmine.createSpyObj("SnackBarService", ["showError"]);

    guard = new AuthGuard(routerSpy, authServiceSpy, snackBarSpy);
    authServiceSpy.getCurrentUser.and.returnValue(true);

    guard.canActivate(new ActivatedRouteSnapshot(), {
      url: "testUrl"
    } as RouterStateSnapshot);

    expect(guard.canActivate).toBeTruthy();
  });

  it("should deactivate route if user is not logged in", () => {
    const snackBarSpy = jasmine.createSpyObj("SnackBarService", ["showError"]);
    const authServiceSpy = jasmine.createSpyObj("AuthService", [
      "getCurrentUser"
    ]);
    const routerSpy = jasmine.createSpyObj("router", ["navigate"]);

    guard = new AuthGuard(routerSpy, authServiceSpy,snackBarSpy);
    authServiceSpy.getCurrentUser.and.returnValue(false);

    guard.canActivate(new ActivatedRouteSnapshot(), {
      url: "testUrl"
    } as RouterStateSnapshot);

    expect(routerSpy.navigate).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(["/auth/login"], {
      queryParams: { redirectUrl: "testUrl" }
    });
  });
});

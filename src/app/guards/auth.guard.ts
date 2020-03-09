import { Injectable } from "@angular/core";
import {
  CanActivate,
  UrlTree,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Route
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../auth/services/auth.service";
import { SnackBarService } from "../services/snack-bar.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: SnackBarService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):  boolean {
    if (this.authService.getCurrentUser()) {
      return true;
    }
    this.snackBar.showError("Please login");
    this.authService.redirectUrl = state.url;
    this.router.navigate(["/auth/login"], {
      queryParams: { redirectUrl: state.url }
    });
    return false;
  }

  // canLoad(route: Route): boolean {
  //   return this.authService.getCurrentUser();
  // }
}

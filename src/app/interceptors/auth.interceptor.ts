import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { SnackBarService } from "../services/snack-bar.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private snackBar: SnackBarService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("authToken");
    const newReq = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${token}`)
    });
    return next.handle(newReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.snackBar.showWarning("Token expried, please login again");
          this.router.navigateByUrl("auth/login");
        } else if (err.status === 404) {
          // this.router.navigateByUrl("something-does-not-exist");
        } else if (err.status === 500) {
          this.snackBar.showError("Internal Server Error");
        }
        return throwError(err);
      })
    );
  }
}

import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar) {}

  showSuccess = (message): void => {
    this._snackBar.open(message, "close", {
      duration: 3000,
      verticalPosition: "bottom",
      panelClass: ["success-snackbar"]
    });
  };

  showError = (message): void => {
    this._snackBar.open(message, "close", {
      duration: 3000,
      verticalPosition: "bottom",
      panelClass: ["error-snackbar"]
    });
  };

  showWarning = (message): void => {
    this._snackBar.open(message, "close", {
      duration: 3000,
      verticalPosition: "bottom",
      panelClass: ["warning-snackbar"]
    });
  };
}

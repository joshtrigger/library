import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root"
})
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar) {}

  /**
   * This method displays a green angular material snack bar
   * with an success message.
   *
   * @param message - message to display on the snack bar
   */
  showSuccess = (message): void => {
    this._snackBar.open(message, "close", {
      duration: 3000,
      verticalPosition: "bottom",
      panelClass: ["success-snackbar"]
    });
  };

  /**
   * This method displays a red angular material snack bar
   * with an error message.
   *
   * @param message - message to display on the snack bar
   */
  showError = (message): void => {
    this._snackBar.open(message, "close", {
      duration: 3000,
      verticalPosition: "bottom",
      panelClass: ["error-snackbar"]
    });
  };

  /**
   * This method displays a yellow angular material snack bar
   * with a warning message.
   *
   * @param message - message to display on the snack bar
   */
  showWarning = (message): void => {
    this._snackBar.open(message, "close", {
      duration: 3000,
      verticalPosition: "bottom",
      panelClass: ["warning-snackbar"]
    });
  };
}

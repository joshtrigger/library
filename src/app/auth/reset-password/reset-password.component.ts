import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "../services/auth.service";

function passwordMatcher(
  c: AbstractControl
): { [key: string]: Boolean } | null {
  const newPassword = c.get("newPassword");
  const confirmPassword = c.get("confirmPassword");

  if (newPassword.pristine || confirmPassword.pristine) {
    return null;
  }
  if (newPassword.value === confirmPassword.value) {
    return null;
  }
  return { match: true };
}
@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"]
})
export class ResetPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  validationMessage: String;

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  private inputErrors = {
    minlength: "Minimum length is 6",
    required: "This field is required"
  };

  ngOnInit() {
    this.passwordForm = this.fb.group(
      {
        newPassword: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", [Validators.required, Validators.minLength(6)]]
      },
      { validator: passwordMatcher }
    );

    const newPasswordFormControl = this.passwordForm.get("newPassword");
    const confirmPasswordFormControl = this.passwordForm.get("confirmPassword");

    newPasswordFormControl.valueChanges.subscribe(() => {
      this.setMessage(newPasswordFormControl);
    });

    confirmPasswordFormControl.valueChanges.subscribe(() => {
      this.setMessage(confirmPasswordFormControl);
    });
  }

  reset(): void {
    const data = this.passwordForm.value;
    this.authService.resetPassword(data).subscribe(
      value => {
        const { message } = value;
        this.showSuccess(message);
      },
      err => {
        const {
          error: { body }
        } = err;
        this.showError(body);
      }
    );
  }

  setMessage(c: AbstractControl): void {
    this.validationMessage = "";
    if ((c.touched || c.dirty) && c.errors) {
      this.validationMessage = Object.keys(c.errors)
        .map(key => (this.validationMessage += this.inputErrors[key]))
        .join(" ");
    }
  }

  showError(message) {
    this._snackBar.open(message, "close", {
      duration: 3000,
      verticalPosition: "bottom",
      panelClass: ["error-snackbar"]
    });
  }

  showSuccess(message) {
    this._snackBar.open(message, "close", {
      duration: 3000,
      verticalPosition: "bottom",
      panelClass: ["success-snackbar"]
    });
  }
}

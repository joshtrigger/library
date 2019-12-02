import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { tap, take } from "rxjs/operators";
import { Router } from '@angular/router';

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"]
})
export class ForgotPasswordComponent implements OnInit {
  emailForm: FormGroup;
  disabled: Boolean = true;
  validationMessage: String;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  private inputErrors = {
    minlength: "Minimum length is 6",
    required: "This field is required",
    pattern: "Enter a valid email"
  };

  ngOnInit() {
    const re = /\S+@\S+\.\S+/;
    this.emailForm = this.fb.group({
      email: ["", [Validators.required, Validators.pattern(re)]]
    });

    this.emailForm.valueChanges.subscribe(() => {
      this.disabled = this.emailForm.status == "VALID" ? false : true;
    });

    const emailFormControl = this.emailForm.get("email");
    emailFormControl.valueChanges.subscribe(() => {
      this.setMessage(emailFormControl);
    });
  }

  send() {
    const data = this.emailForm.value;
    this.authService.forgotPassword(data).subscribe(
      value => {
        const {response:{message}}=value;
        this.showSuccess(message)
        this.router.navigate(['reset-password'])
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

import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"]
})
export class ForgotPasswordComponent implements OnInit {
  emailForm: FormGroup;
  disabled: Boolean = true;
  validationMessage: String;
  btnText: String = "Send";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _snackBarService: SnackBarService,
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

  /**
   * this method disabled the button and 
   * changs the button text to Sending...
   */
  hideButton() {
    this.btnText = "Sending...";
    this.disabled = true;
  }

  /**
   * this method renables the button and 
   * changs the button text to Send
   */
  showButton() {
    this.btnText = "Send";
    this.disabled = false;
  }

  /**
   * This method processes user's request to reset their
   * password
   */
  send(): void {
    this.hideButton();
    const data = this.emailForm.value;
    this.authService.forgotPassword(data).subscribe(
      value => {
        const {response:{message}}=value;
        this._snackBarService.showSuccess(message)
        this.router.navigate(['auth/reset-password'])
      },
      err => {
        const {
          error: { body }
        } = err;
        this._snackBarService.showError(body);
      }
    );
  }

  /**
   * This method is responsible for setting the validation messages
   * by matching the keys of the [[inputErrors]] object with those
   * from the errors collection of the form control or form group.
   *
   * @param c - form control or form group
   */
  setMessage(c: AbstractControl): void {
    this.validationMessage = "";
    if ((c.touched || c.dirty) && c.errors) {
      this.validationMessage = Object.keys(c.errors)
        .map(key => (this.validationMessage += this.inputErrors[key]))
        .join(" ");
    }
  }
}

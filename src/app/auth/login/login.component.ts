import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Librarian } from "src/app/interfaces";
import { Router } from "@angular/router";
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  signUpForm: FormGroup;
  librarians: Array<Librarian>;
  disabled: Boolean;
  btnText: String = "Login";
  signUpBtnText: String = "Sign Up";
  validationMessage: String;
  tabIndex: Number;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBarService: SnackBarService
  ) {}

  private inputErrors = {
    minlength: "Minimum length is 6",
    required: "This field is required",
    pattern: "Enter a valid email"
  };

  ngOnInit() {
    const re = /\S+@\S+\.\S+/;
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.pattern(re)]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });

    this.signUpForm = this.fb.group({
      username: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.pattern(re)]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.setMessage(this.loginForm);
    });

    this.signUpForm.valueChanges.subscribe(() => {
      this.setMessage(this.signUpForm);
    });
  }

  /**
   * This method is responsible for disabling the login button
   * and changing the button text to Logging in...
   */
  hideButton(): void {
    this.btnText = "Logging in...";
    this.disabled = true;
    this.signUpBtnText = "Please wait...";
  }

  /**
   * This method is responsible for re enabling the login button
   * and changing the button text back to Login
   */
  showButton(): void {
    this.btnText = "Login";
    this.disabled = false;
    this.signUpBtnText = "Sign Up";
  }

  /**
   * This method is responsible granting or declining user access to
   * the application
   */
  login(): void {
    this.hideButton();
    const data = this.loginForm.value;
    this.authService.loginUser(data).subscribe(
      value => {
        localStorage.setItem("currentUser", JSON.stringify(value));
        this.router.navigate(["/books"]);
      },
      err => {
        this.showButton();
        const {
          error: { body }
        } = err;
        this._snackBarService.showError(body);
      }
    );
  }

  /**
   * This method is responsible for creating a user account
   * on the application
   */
  signUp() {
    this.hideButton();
    const data = this.signUpForm.value;
    this.authService.signUpUser(data).subscribe(
      value => {
        const { message } = value;
        this._snackBarService.showSuccess(message);
        this.signUpForm.reset();
        this.signUpBtnText = "Sign Up";
        this.tabIndex = 0;
        this.showButton();
      },
      err => {
        this.showButton();
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
   * @param c - form group
   */
  setMessage(form: AbstractControl): void {
    this.validationMessage = "";
    const controls = [
      form.get("username"),
      form.get("email"),
      form.get("password")
    ];
    for (let c of controls) {
      if (c && (c.touched || c.dirty) && c.errors) {
        this.validationMessage = Object.keys(c.errors)
          .map(key => (this.validationMessage += this.inputErrors[key]))
          .join(" ");
      }
    }
  }

  /**
   * This method takes the user back to the login tab
   */
  backToLogin() {
    this.tabIndex = 0;
  }
}

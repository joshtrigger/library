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
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  librarians: Array<Librarian>;
  disabled: Boolean = true;
  btnText: String = "Login";
  validationMessage: String;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
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

    this.loginForm.valueChanges.subscribe(() => {
      this.disabled = this.loginForm.status === "VALID" ? false : true;
    });
    
    const emailFormControl = this.loginForm.get("email");
    const passwordFormControl = this.loginForm.get("password");
    
    emailFormControl.valueChanges.subscribe(() =>
    this.setMessage(emailFormControl)
    );
    passwordFormControl.valueChanges.subscribe(() =>
    this.setMessage(passwordFormControl)
    );
  }
  
  /**
   * This method is responsible for disabling the login button
   * and changing the button text to Logging in...
   */
  hideButton(): void {
    this.btnText = "Logging in...";
    this.disabled = true;
  }

  /**
   * This method is responsible for re enabling the login button
   * and changing the button text back to Login
   */
  showButton(): void {
    this.btnText = "Login";
    this.disabled = false;
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
        this.showError(body);
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

  /**
   * This method displays a red angular material snack bar
   * with an error message.
   * 
   * @param message - message to display on the snack bar
   */
  showError(message):void {
    this._snackBar.open(message, "close", {
      duration: 3000,
      verticalPosition: "bottom",
      panelClass: ["error-snackbar"]
    });
  }
}

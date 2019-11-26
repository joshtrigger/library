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

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  librarians: Array<Librarian>;
  errorMessage: String;
  disabled: Boolean = true;
  btnText: String = "Login";
  validationMessage: String;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
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
      this.errorMessage = "";
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

  hideButton(): void {
    this.btnText = "Logging in...";
    this.disabled = true;
  }
  showButton(): void {
    this.btnText = "Login";
    this.disabled = false;
  }

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
        this.errorMessage = body;
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
}

import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

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
      () => {
        this.router.navigateByUrl("/books");
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
}

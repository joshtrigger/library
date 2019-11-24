import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Librarian } from "src/app/interfaces";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  librarians: Array<Librarian>;
  errorMessage: String;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    const re = /\S+@\S+\.\S+/;
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.pattern(re)]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
    this.loginForm.valueChanges.subscribe(() => {
      this.errorMessage = "";
    });
  }

  login(): void {
    const data = this.loginForm.value;
    this.authService.loginUser(data).subscribe(
      value => {
        console.log(value);
      },
      err => {
        const {
          error: { body }
        } = err;
        this.errorMessage = body;
      }
    );
  }
}

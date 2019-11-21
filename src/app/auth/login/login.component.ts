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

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.getAllLibrarians();
    const re = /\S+@\S+\.\S+/;
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.pattern(re)]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  getAllLibrarians(): void {
    this.authService.fetchLibrarians().subscribe(
      users => {
        this.librarians = users;
      },
      err => {
        console.log(err);
      }
    );
  }

  login(): any {
    const { email, password } = this.loginForm.value;
    for (const user of this.librarians) {
      if (email === user.email && password === user.password) {
        console.log("there was a match");
        return true;
      } else {
        console.error("there was no match");
      }
    }
  }
}

import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  librarians: Array<Object>;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.getAllLibrarians()
    const re = /\S+@\S+\.\S+/;
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.pattern(re)]],
      password: ["", [Validators.required]]
    });
  }

  getAllLibrarians():void{
    this.authService.fetchLibrarians().subscribe(
      users=>{
        this.librarians=users
      },
      err=>{console.log(err)}
    )
  }

  login():void {
    const payload = this.loginForm.value;
    
  }
}

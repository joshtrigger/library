import { Component, OnInit } from "@angular/core";
import { AuthService } from "./auth/services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  isLoggedIn: Boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loggedInUser.subscribe(val => {
      this.isLoggedIn = val ? true : false;
    });
  }
}

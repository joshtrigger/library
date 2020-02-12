import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/services/auth.service";
import { Observable } from "rxjs";
import { BooksService } from "src/app/Books/books.service";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"]
})
export class NavBarComponent implements OnInit {
  isLoggedIn$: Observable<Boolean>;
  options: Array<string> = ["angular", "testing"];

  set searchText(value: string) {
    this.bookService.setSearchText(value);
  }

  constructor(
    private authService: AuthService,
    private bookService: BooksService
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  /**
   * This method calls the logout mehtod from the auth service
   */
  logOut(): void {
    this.authService.logOut();
  }
}

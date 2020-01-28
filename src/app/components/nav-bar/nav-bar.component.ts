import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/auth/services/auth.service";
import { Observable } from "rxjs";
import { BooksService } from 'src/app/Books/books.service';

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"]
})
export class NavBarComponent implements OnInit {
  isLoggedIn$: Observable<Boolean>;
  private _searchText: String;

  get searchText() :String {
    return this._searchText;
  }

  set searchText(value: String) {
    // this._searchText = value;
    this.bookService.searchText = value;
  }

  constructor(private router: Router, private authService: AuthService, private bookService: BooksService) {}

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

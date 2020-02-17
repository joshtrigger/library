import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/auth/services/auth.service";
import { Observable } from "rxjs";
import { BooksService } from "src/app/Books/books.service";
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"]
})
export class NavBarComponent implements OnInit {
  isLoggedIn$: Observable<Boolean>;

  set searchText(value: string) {
    this.bookService.setSearchText(value);
  }

  constructor(
    private authService: AuthService,
    private bookService: BooksService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.router.events.subscribe(event=>{
      if (event instanceof NavigationStart){
        this.searchText=''
      }
    })
  }

  /**
   * This method calls the logout mehtod from the auth service
   */
  logOut(): void {
    this.authService.logOut();
  }
}

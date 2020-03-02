import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NavBarComponent } from "./nav-bar.component";
import { MaterialModule } from "src/app/material.module";
import { AuthService } from "src/app/auth/services/auth.service";
import { FormsModule } from "@angular/forms";
import { BooksService } from "src/app/Books/books.service";
import { By } from "@angular/platform-browser";
import { of } from "rxjs";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { Directive, Input } from "@angular/core";

@Directive({
  selector: "[routerLinkActive]",
  host: { "(click)": "onClick()" }
})
export class RouterLinkActiveStub {
  @Input("routerLinkActive") cssClass: any;
  clickValue: any = null;

  onClick() {
    this.clickValue = this.cssClass;
  }
}

describe("NavBarComponent", () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  const authServiceSpy = jasmine.createSpyObj("AuthService", ["logOut"]);
  const bookServiceSpy = jasmine.createSpyObj("BooksService", [
    "setSearchText"
  ]);
  let router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarComponent, RouterLinkActiveStub],
      imports: [MaterialModule, FormsModule, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: BooksService, useValue: bookServiceSpy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.isLoggedIn$ = of(true);
    router = fixture.debugElement.injector.get(Router);
    // spyOnProperty(router,'events')
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call the logout function", () => {
    component.logOut();
    expect(authServiceSpy.logOut).toHaveBeenCalled();
  });

  it("should send search to books service", () => {
    const spy = spyOnProperty(component, "searchText", "set");
    component.searchText = "text";

    expect(spy).toHaveBeenCalled();
  });

  it("should send search to books service", () => {
    component.searchText = "text";

    expect(bookServiceSpy.setSearchText).toHaveBeenCalledWith("text");
  });
});

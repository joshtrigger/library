import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NavBarComponent } from "./nav-bar.component";
import { MaterialModule } from "src/app/material.module";
import { AuthService } from "src/app/auth/services/auth.service";
import { FormsModule } from "@angular/forms";
import { BooksService } from "src/app/Books/books.service";
import { By } from "@angular/platform-browser";
import { of } from 'rxjs';

describe("NavBarComponent", () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  const authServiceSpy = jasmine.createSpyObj("AuthService", ["logOut"]);
  const bookServiceSpy = jasmine.createSpyObj("BooksService", [
    "setSearchText"
  ]);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [MaterialModule, FormsModule],
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
    component.searchText = 'text'

    expect(spy).toHaveBeenCalled()
  });
  
  it("should send search to books service", () => {
    component.searchText = 'text'

    expect(bookServiceSpy.setSearchText).toHaveBeenCalledWith('text')
  });
});

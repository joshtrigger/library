import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NavBarComponent } from "./nav-bar.component";
import { MaterialModule } from "src/app/material.module";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "src/app/auth/services/auth.service";

describe("NavBarComponent", () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  const authServiceSpy = jasmine.createSpyObj("AuthService", ["logOut"]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [MaterialModule, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call the logout function", () => {
    component.logOut();
    expect(authServiceSpy.logOut).toHaveBeenCalled();
  });
});

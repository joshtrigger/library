import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginComponent } from "./login.component";
import { MaterialModule } from "src/app/material.module";
import { ReactiveFormsModule, FormControl } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { By } from "@angular/platform-browser";
import { of, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router;
  let authServiceSpy = jasmine.createSpyObj("AuthService", ["loginUser"]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should hide the button", () => {
    component.hideButton();
    expect(component.btnText).toEqual("Logging in...");
    expect(component.disabled).toBeTruthy();
  });

  it("should show the button", () => {
    component.showButton();
    expect(component.btnText).toEqual("Login");
    expect(component.disabled).toBeFalsy();
  });

  it("should have an invalid login form", () => {
    const emailInput = fixture.nativeElement.querySelector("input[type=email]");
    const passwordInput = fixture.nativeElement.querySelector(
      "input[type=password]"
    );

    emailInput.value = "me@com";
    passwordInput.value = "pass";
    emailInput.dispatchEvent(new Event("input"));
    passwordInput.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(component.loginForm.status).toEqual("INVALID");
    expect(component.errorMessage).toEqual("");
  });

  it("should have a valid login form", () => {
    const emailInput = fixture.nativeElement.querySelector("input[type=email]");
    const passwordInput = fixture.nativeElement.querySelector(
      "input[type=password]"
    );

    emailInput.value = "me@me.com";
    passwordInput.value = "pass123";
    emailInput.dispatchEvent(new Event("input"));
    passwordInput.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(component.loginForm.status).toEqual("VALID");
    expect(component.errorMessage).toEqual("");
  });

  it("should invoke setMessage function when receiving input", () => {
    const emailInput = fixture.nativeElement.querySelector("input[type=email]");
    const passwordInput = fixture.nativeElement.querySelector(
      "input[type=password]"
    );
    spyOn(component,'setMessage')

    emailInput.value = "me@me.com";
    passwordInput.value = "pass123";
    emailInput.dispatchEvent(new Event("input"));
    passwordInput.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(component.loginForm.status).toEqual("VALID");
    expect(component.errorMessage).toEqual("");
    expect(component.setMessage).toHaveBeenCalledTimes(2)
  });

  it("should test button click in DOM", () => {
    const loginBtn = fixture.debugElement.query(By.css("button"));
    spyOn(component, "login");

    loginBtn.triggerEventHandler("click", null);

    expect(component.login).toHaveBeenCalled();
  });

  it("should call the login function on success", () => {
    const mockResponse = { status: 200, token: "the token" };
    spyOn(component, "hideButton");
    spyOn(router, "navigate");
    authServiceSpy.loginUser.and.returnValue(of(mockResponse));

    component.login();

    expect(component.hideButton).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(["/books"]);
  });

  it("should return error observer on login function call", () => {
    const error = { body: "error has occured" };
    spyOn(component, "showButton");
    authServiceSpy.loginUser.and.returnValue(throwError({ error }));

    component.login();

    expect(component.showButton).toHaveBeenCalled();
    expect(component.errorMessage).toEqual(error.body);
  });
});

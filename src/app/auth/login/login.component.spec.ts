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
import { SnackBarService } from 'src/app/services/snack-bar.service';


describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router;
  let authServiceSpy = jasmine.createSpyObj("AuthService", [
    "loginUser",
    "signUpUser"
  ]);
  let snackBarSpy = jasmine.createSpyObj("SnackBarService", [
    "showError",
    "showSuccess"
  ]);

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
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: SnackBarService, useValue: snackBarSpy }
      ]
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
    expect(component.signUpBtnText).toEqual("Please wait...");
  });

  it("should show the button", () => {
    component.showButton();
    expect(component.btnText).toEqual("Login");
    expect(component.disabled).toBeFalsy();
    expect(component.signUpBtnText).toEqual("Sign Up");
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
  });

  it("should invoke setMessage function when receiving input", () => {
    const emailInput = fixture.nativeElement.querySelector("input[type=email]");
    const passwordInput = fixture.nativeElement.querySelector(
      "input[type=password]"
    );
    spyOn(component, "setMessage");

    emailInput.value = "me@me.com";
    passwordInput.value = "pass123";
    emailInput.dispatchEvent(new Event("input"));
    passwordInput.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(component.loginForm.status).toEqual("VALID");
    expect(component.setMessage).toHaveBeenCalledTimes(2);
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
  });

  it("should return error observer on login function call and showError function", () => {
    const error = { body: "error has occured" };

    authServiceSpy.loginUser.and.returnValue(throwError({ error }));

    component.login();

    expect(snackBarSpy.showError).toHaveBeenCalled();
  });

  it("should call backToLogin function", () => {
    component.backToLogin();
    expect(component.tabIndex).toEqual(0);
  });
  it("should call the sign up function", () => {
    const mockResponse = { message: "success" };
    spyOn(component, "showButton");
    spyOn(component, "hideButton");

    authServiceSpy.signUpUser.and.returnValue(of(mockResponse));
    component.signUp();

    expect(component.hideButton).toHaveBeenCalled();
    expect(component.showButton).toHaveBeenCalled();
    expect(component.signUpBtnText).toBe("Sign Up");
    expect(component.tabIndex).toBe(0);
  });

  it("should call the sign up function", () => {
    const mockResponse = { error: { body: "success" } };
    spyOn(component, "showButton");

    authServiceSpy.signUpUser.and.returnValue(throwError(mockResponse));
    component.signUp();

    expect(component.showButton).toHaveBeenCalled();
    expect(snackBarSpy.showError).toHaveBeenCalled();
  });
});

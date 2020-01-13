import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ForgotPasswordComponent } from "./forgot-password.component";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MaterialModule } from "src/app/material.module";
import { ReactiveFormsModule, FormControl } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Router } from "@angular/router";
import { of, throwError } from "rxjs";
import { By } from "@angular/platform-browser";
import { AuthService } from "../services/auth.service";
import { SnackBarService } from "src/app/services/snack-bar.service";

describe("ForgotPasswordComponent", () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let router;
  let authServiceSpy = jasmine.createSpyObj("AuthService", ["forgotPassword"]);
  let snackBarSpy = jasmine.createSpyObj("SnackBarService", [
    "showError",
    "showSuccess"
  ]);
  let routerSpy = jasmine.createSpyObj("Router", ["navigate"]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      imports: [
        HttpClientTestingModule,
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: SnackBarService, useValue: snackBarSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should have a valid email form", () => {
    const emailInput = fixture.nativeElement.querySelector("input[type=email]");
    spyOn(component, "setMessage");

    emailInput.value = "me@me.com";
    emailInput.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(component.emailForm.status).toEqual("VALID");
    expect(component.setMessage).toHaveBeenCalled();
    expect(component.setMessage).toHaveBeenCalledTimes(1);
  });

  it("should have a invalid email form", () => {
    const emailInput = fixture.nativeElement.querySelector("input[type=email]");
    spyOn(component, "setMessage");

    emailInput.value = "mecom";
    emailInput.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(component.emailForm.status).toEqual("INVALID");
    expect(component.setMessage).toHaveBeenCalled();
    expect(component.setMessage).toHaveBeenCalledTimes(1);
  });

  it("should click send button in the DOM", () => {
    const btn = fixture.debugElement.query(By.css("button"));
    spyOn(component, "send");

    btn.triggerEventHandler("click", null);

    expect(component.send).toHaveBeenCalled();
  });

  it("should successfully send email to user", () => {
    const mockResponse = { status: 200, response: { message: "success" } };

    authServiceSpy.forgotPassword.and.returnValue(of(mockResponse));
    spyOn(component, "hideButton");
    component.send();

    expect(snackBarSpy.showSuccess).toHaveBeenCalled();
    expect(snackBarSpy.showSuccess).toHaveBeenCalledWith("success");
    expect(routerSpy.navigate).toHaveBeenCalledWith(["auth/reset-password"]);
    expect(component.hideButton).toHaveBeenCalled();
  });

  it("should not send email to user", () => {
    const mockResponse = { error: { body: "error has occurred" } };

    authServiceSpy.forgotPassword.and.returnValue(throwError(mockResponse));
    component.send();

    expect(snackBarSpy.showError).toHaveBeenCalled();
    expect(snackBarSpy.showError).toHaveBeenCalledWith("error has occurred");
  });

  it("should display error messages by calling setMessage function", () => {
    const emailInput = fixture.nativeElement.querySelector("input");

    emailInput.value = "";
    emailInput.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(component.setMessage).toBeTruthy();
  });

  it("should call the hideButton function", () => {
    component.hideButton();

    expect(component.btnText).toEqual("Sending...");
    expect(component.disabled).toEqual(true);
  });

  it("should call the showButton function", () => {
    component.showButton();

    expect(component.btnText).toEqual("Send");
    expect(component.disabled).toEqual(false);
  });
});

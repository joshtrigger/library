import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ResetPasswordComponent } from "./reset-password.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthService } from "../services/auth.service";
import { By } from "@angular/platform-browser";
import { of, throwError } from "rxjs";
import { SnackBarService } from 'src/app/services/snack-bar.service';

describe("ResetPasswordComponent", () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let authServiceSpy = jasmine.createSpyObj("AuthService", ["resetPassword"]);
  let snackBarSpy = jasmine.createSpyObj("SnackBarService", [
    "showError",
    "showSuccess"
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: SnackBarService, useValue: snackBarSpy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should validate input by calling setMessage and form should be valid", () => {
    const password = fixture.nativeElement.querySelector(
      "input[formControlName=newPassword]"
    );
    const confirmPassword = fixture.nativeElement.querySelector(
      "input[formControlName=confirmPassword]"
    );
    spyOn(component, "setMessage");

    password.value = "password";
    confirmPassword.value = "password";
    password.dispatchEvent(new Event("input"));
    confirmPassword.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(component.passwordForm.status).toEqual("VALID");
    expect(component.setMessage).toHaveBeenCalledTimes(2);
  });

  it("should validate input by calling setMessage with invalid input", () => {
    const password = fixture.nativeElement.querySelector(
      "input[formControlName=newPassword]"
    );
    const confirmPassword = fixture.nativeElement.querySelector(
      "input[formControlName=confirmPassword]"
    );
    spyOn(component, "setMessage");

    password.value = "password";
    confirmPassword.value = "pass";
    password.dispatchEvent(new Event("input"));
    confirmPassword.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(component.passwordForm.status).toEqual("INVALID");
    expect(component.setMessage).toHaveBeenCalledTimes(2);
  });

  it("should display validation messages", () => {
    const password = fixture.nativeElement.querySelector(
      "input[formControlName=newPassword]"
    );
    const confirmPassword = fixture.nativeElement.querySelector(
      "input[formControlName=confirmPassword]"
    );

    password.value = "password";
    confirmPassword.value = "pass";
    password.dispatchEvent(new Event("input"));
    confirmPassword.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(component.passwordForm.status).toEqual("INVALID");
    expect(component.validationMessage).toEqual("Minimum length is 6");
  });

  it("should call reset when DOM button is clicked", () => {
    const btn = fixture.debugElement.query(By.css("button"));
    spyOn(component, "reset");

    btn.triggerEventHandler("click", null);

    expect(component.reset).toHaveBeenCalled();
  });

  it("should reset password successfully", () => {
    const mockResponse = { message: "success" };

    authServiceSpy.resetPassword.and.returnValue(of(mockResponse));
    component.reset();

    expect(snackBarSpy.showSuccess).toHaveBeenCalled();
    expect(snackBarSpy.showSuccess).toHaveBeenCalledWith("success");
  });

  it("should fail to reset password", () => {
    const mockResponse = { error: { body: "error" } };

    authServiceSpy.resetPassword.and.returnValue(throwError(mockResponse));
    component.reset();

    expect(snackBarSpy.showError).toHaveBeenCalled();
    expect(snackBarSpy.showError).toHaveBeenCalledWith("error");
  });
});

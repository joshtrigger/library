import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ResetPasswordComponent } from "./reset-password.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthService } from "../services/auth.service";
import { By } from "@angular/platform-browser";
import { of, throwError } from "rxjs";
import { MatSnackBar } from '@angular/material/snack-bar';

describe("ResetPasswordComponent", () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let authServiceSpy = jasmine.createSpyObj("AuthService", ["resetPassword"]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
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
    expect(component.validationMessage).toEqual('Minimum length is 6')
  });

  it("should call reset when DOM button is clicked", () => {
    const btn = fixture.debugElement.query(By.css("button"));
    spyOn(component, "reset");

    btn.triggerEventHandler("click", null);

    expect(component.reset).toHaveBeenCalled();
  });

  it("should reset password successfully", () => {
    const mockResponse = { message: "success"  };
    spyOn(component, "showSuccess");

    authServiceSpy.resetPassword.and.returnValue(of(mockResponse));
    component.reset();

    expect(component.showSuccess).toHaveBeenCalled();
    expect(component.showSuccess).toHaveBeenCalledWith("success");
  });

  it("should fail to reset password", () => {
    const mockResponse = { error: { body: "error" } };
    spyOn(component, "showError");

    authServiceSpy.resetPassword.and.returnValue(throwError(mockResponse));
    component.reset();

    expect(component.showError).toHaveBeenCalled();
    expect(component.showError).toHaveBeenCalledWith("error");
  });

  it("should show display success snack bar", () => {
    const snackBar = fixture.debugElement.injector.get(MatSnackBar);

    component.showSuccess("message");
    snackBar.dismiss();

    expect(component.showSuccess).toBeTruthy();
  });

  it("should show display error snack bar", () => {
    const snackBar = fixture.debugElement.injector.get(MatSnackBar);

    component.showError("error");
    snackBar.dismiss();

    expect(component.showError).toBeTruthy();
  });
});

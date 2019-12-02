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
import { MatSnackBar } from "@angular/material/snack-bar";

describe("ForgotPasswordComponent", () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let router;
  let authServiceSpy = jasmine.createSpyObj("AuthService", ["forgotPassword"]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
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
    spyOn(router, "navigate");
    spyOn(component, "showSuccess");

    authServiceSpy.forgotPassword.and.returnValue(of(mockResponse));
    component.send();

    expect(component.showSuccess).toHaveBeenCalled();
    expect(component.showSuccess).toHaveBeenCalledWith("success");
    expect(router.navigate).toHaveBeenCalledWith(["reset-password"]);
  });

  it("should not send email to user", () => {
    const mockResponse = { error: { body: "error has occurred" } };
    spyOn(component, "showError");

    authServiceSpy.forgotPassword.and.returnValue(throwError(mockResponse));
    component.send();

    expect(component.showError).toHaveBeenCalled();
    expect(component.showError).toHaveBeenCalledWith("error has occurred");
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
  it("should display error messages by calling setMessage function", () => {
    const emailInput = fixture.nativeElement.querySelector("input");

    emailInput.value = "";
    emailInput.dispatchEvent(new Event("input"));
    fixture.detectChanges();

    expect(component.setMessage).toBeTruthy();
  });
});

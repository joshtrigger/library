import { TestBed } from "@angular/core/testing";

import { SnackBarService } from "./snack-bar.service";
import { MatSnackBar } from "@angular/material/snack-bar";

describe("SnackBarService", () => {
  const snackBarSpy = jasmine.createSpyObj("MatSnackBar", ["open"]);

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: MatSnackBar, useValue: snackBarSpy }]
    })
  );

  it("should be created", () => {
    const service: SnackBarService = TestBed.get(SnackBarService);
    expect(service).toBeTruthy();
  });

  it("should call the showSucsess function", () => {
    const css = {
      duration: 3000,
      verticalPosition: "bottom",
      panelClass: ["success-snackbar"]
    };
    const service: SnackBarService = TestBed.get(SnackBarService);
    service.showSuccess("success");
    expect(snackBarSpy.open).toHaveBeenCalledWith("success", "close", css);
  });
  it("should call the showError function", () => {
    const css = {
      duration: 3000,
      verticalPosition: "bottom",
      panelClass: ["error-snackbar"]
    };
    const service: SnackBarService = TestBed.get(SnackBarService);
    service.showError("error");
    expect(snackBarSpy.open).toHaveBeenCalledWith("error", "close", css);
  });
  it("should call the showWarning function", () => {
    const css = {
      duration: 3000,
      verticalPosition: "bottom",
      panelClass: ["warning-snackbar"]
    };
    const service: SnackBarService = TestBed.get(SnackBarService);
    service.showWarning("warning");
    expect(snackBarSpy.open).toHaveBeenCalledWith("warning", "close", css);
  });
});

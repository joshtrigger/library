import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LendBookComponent } from "./lend-book.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material.module";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ReadersService } from "src/app/readers/readers.service";
import { of, throwError } from "rxjs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SnackBarService } from 'src/app/services/snack-bar.service';

describe("LendBookComponent", () => {
  let component: LendBookComponent;
  let fixture: ComponentFixture<LendBookComponent>;
  let dialogRefSpy = jasmine.createSpyObj("MatDialogRef", ["close"]);
  let readersServiceSpy = jasmine.createSpyObj("ReadersService", [
    "getReaders"
  ]);
  let snackBarSpy = jasmine.createSpyObj("SnackBarService", [
    "showError"
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LendBookComponent],
      imports: [ReactiveFormsModule, MaterialModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: 1 },
        { provide: ReadersService, useValue: readersServiceSpy },
        { provide: SnackBarService, useValue: snackBarSpy },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LendBookComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    readersServiceSpy.getReaders.and.returnValue(of([]));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it("should close modal", () => {
    fixture.detectChanges();
    component.closeModal();
    expect(dialogRefSpy.close).toHaveBeenCalledWith("closed");
  });

  it("should fail to fetch users", () => {
    readersServiceSpy.getReaders.and.returnValue(throwError("error"));
    fixture.detectChanges();
    expect(snackBarSpy.showError).toHaveBeenCalledWith('error')
  });

  it("should lend out book to user", () => {
    // readersServiceSpy.getReaders.and.returnValue(of([]));
    spyOn(JSON, "parse").and.returnValue({ user: { id: 1 } });
    fixture.detectChanges();
    component.lendBook();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});

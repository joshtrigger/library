import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LendBookComponent } from "./lend-book.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material.module";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ReadersService } from "src/app/readers/readers.service";
import { of } from "rxjs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

fdescribe("LendBookComponent", () => {
  let component: LendBookComponent;
  let fixture: ComponentFixture<LendBookComponent>;
  let dialogRefSpy = jasmine.createSpyObj("MatDialogRef", ["close"]);
  let readersServiceSpy = jasmine.createSpyObj("ReadersService", [
    "getReaders"
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LendBookComponent],
      imports: [ReactiveFormsModule, MaterialModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: 1 },
        { provide: ReadersService, useValue: readersServiceSpy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LendBookComponent);
    component = fixture.componentInstance;
    readersServiceSpy.getReaders.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

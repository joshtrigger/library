import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ReportDialogComponent } from "./report-dialog.component";
import { MaterialModule } from "src/app/material.module";
import { FormsModule } from "@angular/forms";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe("ReportDialogComponent", () => {
  let component: ReportDialogComponent;
  let fixture: ComponentFixture<ReportDialogComponent>;
  const matDialogRefSpy = jasmine.createSpyObj("MatDialogRef", ["close"]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportDialogComponent],
      imports: [
        MaterialModule,
        FormsModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

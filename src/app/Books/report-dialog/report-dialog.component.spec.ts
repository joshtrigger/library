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
import { By } from "@angular/platform-browser";

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
        { provide: MAT_DIALOG_DATA, useValue: 1 }
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
  it("should listen to click on close button in DOM", () => {
    const button = fixture.debugElement.query(By.css("button"));
    spyOn(component, "closeModal");

    button.triggerEventHandler("click", null);

    expect(component.closeModal).toHaveBeenCalledTimes(1);
  });

  it("should listen to click on send button in DOM", () => {
    const buttons = fixture.debugElement.queryAll(By.css("button"));
    spyOn(component, "sendReport");

    buttons[1].triggerEventHandler("click", null);

    expect(component.sendReport).toHaveBeenCalledTimes(1);
  });

  it("should call the closeModal function", () => {
    component.closeModal();
    expect(matDialogRefSpy.close).toHaveBeenCalled();
  });

  it("should call the sendReport function", () => {
    const mockData = {
      book_id: 1,
      type: "damage",
      status: "repair",
      notes: "comments"
    };
    const selects = fixture.debugElement.queryAll(By.css("mat-select"));
    const textArea = fixture.debugElement.query(By.css("textarea"));

    selects[0].triggerEventHandler("valueChange", "damage");
    selects[1].triggerEventHandler("valueChange", "repair");
    textArea.triggerEventHandler("ngModelChange", "comments");
    component.sendReport();

    expect(matDialogRefSpy.close).toHaveBeenCalled();
    expect(matDialogRefSpy.close).toHaveBeenCalledWith(mockData);
    expect(component.type).toEqual("damage");
    expect(component.status).toEqual("repair");
    expect(component.comment).toEqual("comments");
  });
});

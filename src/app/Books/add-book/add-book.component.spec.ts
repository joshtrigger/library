import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AddBookComponent } from "./add-book.component";
import { MaterialModule } from "src/app/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import { MatDatepickerModule } from "@angular/material";

describe("AddBookComponent", () => {
  let component: AddBookComponent;
  let fixture: ComponentFixture<AddBookComponent>;
  const matDialogRefSpy = jasmine.createSpyObj("MatDialogRef", ["close"]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddBookComponent],
      imports: [
        MaterialModule,
        FormsModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call the closeModal function", () => {
    component.closeModal();
    expect(matDialogRefSpy.close).toHaveBeenCalled();
  });

  it("should listen when close modal button is clicked", () => {
    const buttons = fixture.debugElement.queryAll(By.css("button"));

    spyOn(component, "closeModal");
    buttons[0].triggerEventHandler("click", null);

    expect(component.closeModal).toHaveBeenCalled();
    expect(component.closeModal).toHaveBeenCalledTimes(1);
  });

  it("should listen when add button is clicked", () => {
    const button = fixture.debugElement.queryAll(By.css("button"));

    spyOn(component, "save");
    button[2].triggerEventHandler("click", null);

    expect(component.save).toHaveBeenCalled();
    expect(matDialogRefSpy.close).toHaveBeenCalled();
  });

  it("should call the addBook function", () => {
    component.save();
    expect(matDialogRefSpy.close).toHaveBeenCalled();
  });
});

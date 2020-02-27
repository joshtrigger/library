import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AddReaderComponent } from "./add-reader.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "src/app/material.module";
import { MatDialogRef, MatSelect, MatOption } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";

fdescribe("AddReaderComponent", () => {
  let component: AddReaderComponent;
  let fixture: ComponentFixture<AddReaderComponent>;
  let dialogRefSpy = jasmine.createSpyObj("MatDialogRef", ["close"]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddReaderComponent],
      imports: [ReactiveFormsModule, MaterialModule, BrowserAnimationsModule],
      providers: [{ provide: MatDialogRef, useValue: dialogRefSpy }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should close the modal", () => {
    component.closeModal();
    expect(dialogRefSpy.close).toHaveBeenCalledWith("closed");
  });

  it("should get all input elements", () => {
    const inputs = fixture.nativeElement.querySelectorAll(
      "input"
    );
    const matSelect = fixture.debugElement.query(By.directive(MatSelect));
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector(
      "button"
    );
    const options: MatOption[] = component.matSelect.options.toArray();

    (<MatSelect>matSelect.componentInstance).selectionChange.emit()

    for (let index = 0; index < inputs.length; index++) {
      if (index === 2) {
        inputs[index].value = 1234456789098;
      } else {
        inputs[index].value = "somevalue";
      }

      inputs[index].dispatchEvent(new Event("input"));
    }

    options[1]._selectViaInteraction();

    fixture.detectChanges();

    expect(options.length).toBe(5);
    expect(options[1].selected).toBe(true);
    expect(component.addUserForm.status).toEqual("VALID");
  });
});

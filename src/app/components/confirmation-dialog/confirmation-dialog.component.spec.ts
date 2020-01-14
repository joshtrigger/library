import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ConfirmationDialogComponent } from "./confirmation-dialog.component";
import { MaterialModule } from "src/app/material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialogModule, MatDialogRef } from "@angular/material";

describe("ConfirmationDialogComponent", () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;
  const matDialogRefSpy = jasmine.createSpyObj("MatDialogRef", ["close"]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationDialogComponent],
      imports: [MaterialModule, BrowserAnimationsModule, MatDialogModule],
      providers: [{ provide: MatDialogRef, useValue: matDialogRefSpy }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call the confirm function when the yes button is clicked and the button text should be Yes", () => {
    const button = fixture.nativeElement.querySelector("button[id=yes]");
    spyOn(component, "confirm");

    button.click();

    expect(component.confirm).toHaveBeenCalled();
    expect(button.textContent).toBe("Yes");
  });

  it("should call the decline function when the no button is clicked and the button text should be Cancel", () => {
    const button = fixture.nativeElement.querySelector("button[id=no]");
    spyOn(component, "decline");

    button.click();

    expect(component.decline).toHaveBeenCalled();
    expect(button.textContent).toBe("Cancel");
  });

  it("should have a header reading as 'Are you sure?'", () => {
    const header = fixture.nativeElement.querySelector("h2");

    expect(header.textContent).toBe("Are you sure?");
  });

  it("should call the confirm function", () => {
    component.confirm();

    expect(matDialogRefSpy.close).toHaveBeenCalledWith("confirmed");
  });
  it("should call the decline function", () => {
    component.decline();

    expect(matDialogRefSpy.close).toHaveBeenCalled();
  });
});

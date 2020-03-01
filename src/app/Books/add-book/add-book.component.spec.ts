import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AddBookComponent } from "./add-book.component";
import { MaterialModule } from "src/app/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import { MatDatepickerModule } from "@angular/material";
import { Book } from 'src/app/interfaces';

describe("AddBookComponent", () => {
  let component: AddBookComponent;
  let fixture: ComponentFixture<AddBookComponent>;
  const matDialogRefSpy = jasmine.createSpyObj("MatDialogRef", ["close"]);
  const book: Book = {
    id:1,
    title:'title',
    authors:'joshua',
    isbn:'123-12',
    release_date:'12-03-2019',
    edition:'3rd',
    count:2,
    about:'some info',
    imageUrl:'',
    publisher:'mk'
  }

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
        { provide: MAT_DIALOG_DATA, useValue: { book, title:'edit book'} }
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

  it('should open the add book dialog',()=>{
    const d = fixture.debugElement.injector.get(MAT_DIALOG_DATA)
    d.title = 'add book'
    d.book = null
    fixture.detectChanges()
  })
});

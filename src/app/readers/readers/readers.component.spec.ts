import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ReadersComponent } from "./readers.component";
import { MaterialModule } from "src/app/material.module";
import { BooksService } from "src/app/Books/books.service";
import { ReadersService } from "../readers.service";
import { SnackBarService } from "src/app/services/snack-bar.service";
import { MatDialog } from "@angular/material";
import { NgSanLetterIconModule } from "ng-san-letter-icon";
import { of, throwError } from "rxjs";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Reader } from "src/app/interfaces";

describe("ReadersComponent", () => {
  let component: ReadersComponent;
  let fixture: ComponentFixture<ReadersComponent>;
  let readersServiceSpy = jasmine.createSpyObj("ReadersService", [
    "getReaders",
    "addReader"
  ]);
  let snackBarServiceSpy = jasmine.createSpyObj("SnackBarService", [
    "showSuccess",
    "showError"
  ]);
  let dialogSpy = jasmine.createSpyObj("MatDialog", ["open"]);
  let bookService: BooksService;
  const reader: Reader = {
    id: 1,
    name: "Joshua Lugada",
    email: "jl@email.com",
    id_no: 123,
    id_type: "work",
    phone_number: "0703123456",
    borrowed_books: 3
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReadersComponent],
      imports: [MaterialModule, NgSanLetterIconModule, HttpClientTestingModule],
      providers: [
        BooksService,
        { provide: ReadersService, useValue: readersServiceSpy },
        { provide: SnackBarService, useValue: snackBarServiceSpy },
        { provide: MatDialog, useValue: dialogSpy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadersComponent);
    component = fixture.componentInstance;
    bookService = fixture.debugElement.injector.get(BooksService);
    spyOnProperty(bookService, "searchText$").and.returnValue(of("Joshua"));
    readersServiceSpy.getReaders.and.returnValue(of([reader]));
  });

  it("should fetch all readers", () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(readersServiceSpy.getReaders).toHaveBeenCalled();
  });

  it("should not fetch all readers", () => {
    readersServiceSpy.getReaders.and.returnValue(throwError("error"));
    fixture.detectChanges();
    expect(readersServiceSpy.getReaders).toHaveBeenCalled();
    expect(snackBarServiceSpy.showError).toHaveBeenCalledWith("error");
    expect(component.showSpinner).toBe(false);
  });

  it("should add a reader", () => {
    const dialogRefSpy = jasmine.createSpyObj("dialogRef", ["afterClosed"]);
    dialogSpy.open.and.returnValue(dialogRefSpy);
    dialogRefSpy.afterClosed.and.returnValue(of([reader]));
    readersServiceSpy.addReader.and.returnValue(of({}));
    fixture.detectChanges();
    component.addReader();
    expect(dialogSpy.open).toHaveBeenCalled();
    expect(dialogRefSpy.afterClosed).toHaveBeenCalled();
    expect(readersServiceSpy.addReader).toHaveBeenCalled();
    expect(snackBarServiceSpy.showSuccess).toHaveBeenCalled();
  });

  it("should fail to add a reader", () => {
    const dialogRefSpy = jasmine.createSpyObj("dialogRef", ["afterClosed"]);
    dialogSpy.open.and.returnValue(dialogRefSpy);
    dialogRefSpy.afterClosed.and.returnValue(of([reader]));
    readersServiceSpy.addReader.and.returnValue(throwError('error'));
    fixture.detectChanges();
    component.addReader();
    expect(dialogSpy.open).toHaveBeenCalled();
    expect(dialogRefSpy.afterClosed).toHaveBeenCalled();
    expect(readersServiceSpy.addReader).toHaveBeenCalled();
    expect(snackBarServiceSpy.showError).toHaveBeenCalledWith('error');
  });

  it("should not add a reader when dialog is closed", () => {
    const dialogRefSpy = jasmine.createSpyObj("dialogRef", ["afterClosed"]);
    dialogSpy.open.and.returnValue(dialogRefSpy);
    dialogRefSpy.afterClosed.and.returnValue(of("closed"));
    fixture.detectChanges();
    component.addReader();
    expect(dialogSpy.open).toHaveBeenCalled();
    expect(dialogRefSpy.afterClosed).toHaveBeenCalled();
  });

  it('should return false when search filter does not match records',()=>{
    bookService.searchText$
    fixture.detectChanges()
    expect(component.filteredReaders.length).toBe(0)
  })
});

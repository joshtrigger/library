import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BooksComponent } from "./books.component";
import { MaterialModule } from "src/app/material.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BooksService } from "../books.service";
import { of, throwError } from "rxjs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SnackBarService } from "src/app/services/snack-bar.service";
import { Book } from "src/app/interfaces";
import { MatDialog } from "@angular/material";

describe("BooksComponent", () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let bookServiceSpy = jasmine.createSpyObj("BookService", [
    "fetchBooks",
    "lendOutBook",
    "reportBook",
    "addBook"
  ]);
  let snackBarSpy = jasmine.createSpyObj("SnackBarService", [
    "showError",
    "showSuccess"
  ]);
  let matDialogSpy = jasmine.createSpyObj("MatDialog", ["open"]);
  let dialogRefSpy = jasmine.createSpyObj("dialogRef", ["afterClosed"]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BooksComponent],
      imports: [MaterialModule, BrowserAnimationsModule],
      providers: [
        { provide: BooksService, useValue: bookServiceSpy },
        { provide: SnackBarService, useValue: snackBarSpy },
        { provide: MatDialog, useValue: matDialogSpy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    matDialogSpy.open.and.returnValue(dialogRefSpy);
    dialogRefSpy.afterClosed.and.returnValue(of({}));
  });

  it("should fetch all the books", () => {
    const book: Book = {
      id: 1,
      authors: "josh",
      title: "title",
      release_date: "123",
      isbn: "123-34-54",
      publisher: "MK",
      count: 1,
      imageUrl: "/path/file",
      about: "something",
      edition: "1st"
    };

    bookServiceSpy.fetchBooks.and.returnValue(of([book]));
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.books).toEqual([book]);
  });

  it("should return error when calling fetchBooks function", () => {
    bookServiceSpy.fetchBooks.and.returnValue(throwError({}));
    fixture.detectChanges();

    expect(snackBarSpy.showError).toHaveBeenCalledWith(
      "Error occured when fetching records"
    );
  });

  it("should be able to report a book", () => {
    bookServiceSpy.reportBook.and.returnValue(of({}));
    fixture.detectChanges();
    component.report(1);

    expect(bookServiceSpy.reportBook).toHaveBeenCalled();
    expect(matDialogSpy.open).toHaveBeenCalled();
    expect(snackBarSpy.showSuccess).toHaveBeenCalledWith(
      "Report has been sent"
    );
  });
  it("should fail to report a book", () => {
    bookServiceSpy.reportBook.and.returnValue(throwError({}));
    fixture.detectChanges();
    component.report(1);

    expect(bookServiceSpy.reportBook).toHaveBeenCalled();
    expect(matDialogSpy.open).toHaveBeenCalled();
    expect(snackBarSpy.showError).toHaveBeenCalledWith(
      "Error occurred while sending report"
    );
  });
  it("should be able to add a book", () => {
    bookServiceSpy.addBook.and.returnValue(of({}));
    fixture.detectChanges();
    component.addBook();

    expect(bookServiceSpy.addBook).toHaveBeenCalled();
    expect(matDialogSpy.open).toHaveBeenCalled();
    expect(snackBarSpy.showSuccess).toHaveBeenCalledWith(
      "Successfully added book"
    );
  });
  it("should fail to add a book", () => {
    bookServiceSpy.addBook.and.returnValue(throwError({}));
    fixture.detectChanges();
    component.addBook();

    expect(bookServiceSpy.addBook).toHaveBeenCalled();
    expect(matDialogSpy.open).toHaveBeenCalled();
    // expect(snackBarSpy.showError).toHaveBeenCalledWith(
    //   "Error while adding book"
    // );
  });
});

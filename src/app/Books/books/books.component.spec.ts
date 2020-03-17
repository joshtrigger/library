import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  flush
} from "@angular/core/testing";

import { BooksComponent } from "./books.component";
import { MaterialModule } from "src/app/material.module";
import { BooksService } from "../books.service";
import { of, throwError } from "rxjs";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SnackBarService } from "src/app/services/snack-bar.service";
import { Book } from "src/app/interfaces";
import { MatDialog } from "@angular/material";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("BooksComponent", () => {
  let bookService: BooksService;
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let snackBarSpy = jasmine.createSpyObj("SnackBarService", [
    "showError",
    "showSuccess"
  ]);
  let matDialogSpy = jasmine.createSpyObj("MatDialog", ["open"]);
  let dialogRefSpy = jasmine.createSpyObj("dialogRef", ["afterClosed"]);
  const book: Book = {
    id: 1,
    authors: "josh",
    title: "title",
    release_date: "12-09-2019",
    isbn: "123-34-54",
    publisher: "MK",
    count: 1,
    imageUrl: "",
    about: "something",
    edition: "1st"
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BooksComponent],
      imports: [
        MaterialModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        BooksService,
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
    bookService = fixture.debugElement.injector.get(BooksService);
  });

  it("should fetch all the books", () => {
    spyOn(bookService, "fetchBooks").and.returnValue(of([book]));
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.books).toEqual([book]);
  });

  it("should return error when calling fetchBooks function", () => {
    spyOn(bookService, "fetchBooks").and.returnValue(throwError({}));
    fixture.detectChanges();

    expect(snackBarSpy.showError).toHaveBeenCalledWith(
      "Error occured when fetching records"
    );
  });

  it("should be able to report a book", () => {
    spyOn(bookService, "reportBook").and.returnValue(of({}));
    fixture.detectChanges();
    component.report(1);

    expect(bookService.reportBook).toHaveBeenCalled();
    expect(matDialogSpy.open).toHaveBeenCalled();
    expect(snackBarSpy.showSuccess).toHaveBeenCalledWith(
      "Report has been sent"
    );
  });

  it("should fail to report a book", () => {
    spyOn(bookService, "reportBook").and.returnValue(
      throwError({ body: { error: "messgae" } })
    );
    fixture.detectChanges();
    component.report(1);

    expect(bookService.reportBook).toHaveBeenCalled();
    expect(matDialogSpy.open).toHaveBeenCalled();
    expect(snackBarSpy.showError).toHaveBeenCalled();
  });

  it("should close modal when no report is sent", () => {
    spyOn(bookService, "reportBook").and.returnValue(
      throwError({ body: { error: "Cannot read property 'id' of null" } })
    );
    fixture.detectChanges();
    component.report(1);

    expect(bookService.reportBook).toHaveBeenCalled();
    expect(matDialogSpy.open).toHaveBeenCalled();
    expect(snackBarSpy.showError).toHaveBeenCalled();
  });
  it("should be able to add a book", () => {
    spyOn(bookService, "addBook").and.returnValue(of({}));
    fixture.detectChanges();
    component.addBook();

    expect(bookService.addBook).toHaveBeenCalled();
    expect(matDialogSpy.open).toHaveBeenCalled();
    expect(snackBarSpy.showSuccess).toHaveBeenCalledWith(
      "Successfully added book"
    );
  });
  it("should fail to add a book", () => {
    spyOn(bookService, "addBook").and.returnValue(
      throwError({ body: { error: "error message" } })
    );
    fixture.detectChanges();
    component.addBook();

    expect(bookService.addBook).toHaveBeenCalled();
    expect(matDialogSpy.open).toHaveBeenCalled();
    expect(snackBarSpy.showError).toHaveBeenCalled();
  });

  it("should close the modal when no book is added", () => {
    spyOn(bookService, "addBook").and.returnValue(
      throwError({ body: { error: "Cannot read property 'id' of null" } })
    );
    fixture.detectChanges();
    component.addBook();

    expect(bookService.addBook).toHaveBeenCalled();
    expect(matDialogSpy.open).toHaveBeenCalled();
    expect(snackBarSpy.showError).toHaveBeenCalled();
  });

  it("should delete book successfully", () => {
    dialogRefSpy.afterClosed.and.returnValue(of("confirmed"));
    spyOn(bookService, "deleteBook").and.returnValue(
      of({ msg: "deleted book" })
    );
    fixture.detectChanges();
    component.delete(1);

    expect(snackBarSpy.showSuccess).toHaveBeenCalled();
  });

  it("should fail to delete book", () => {
    dialogRefSpy.afterClosed.and.returnValue(of("confirmed"));
    spyOn(bookService, "deleteBook").and.returnValue(throwError({}));
    fixture.detectChanges();
    component.delete(1);

    expect(snackBarSpy.showError).toHaveBeenCalled();
  });

  it("should fail to delete book when modal is closed", () => {
    dialogRefSpy.afterClosed.and.returnValue(of("null"));
    spyOn(bookService, "deleteBook").and.returnValue(throwError({}));
    fixture.detectChanges();
    component.delete(1);

    expect(snackBarSpy.showError).toHaveBeenCalled();
  });

  it("should call addBook function when '+' button is clicked", () => {
    const btn = fixture.nativeElement.querySelector("button");
    spyOn(component, "addBook");

    btn.click();

    expect(component.addBook).toHaveBeenCalled();
  });

  it("should lend out book successfully", () => {
    spyOn(bookService, "lendOutBook").and.returnValue(of({}));
    component.lend(1);
    expect(snackBarSpy.showSuccess).toHaveBeenCalledWith("Success");
  });

  it("should not lend out book successfully", () => {
    spyOn(bookService, "lendOutBook").and.returnValue(throwError("error"));
    component.lend(1);
    expect(snackBarSpy.showError).toHaveBeenCalledWith("error");
  });

  it("should not lend out book when dialog is just closed", () => {
    dialogRefSpy.afterClosed.and.returnValue(of("closed"));
    component.lend(1);
    expect(snackBarSpy.showError).toHaveBeenCalledWith("error");
  });

  it("should call the edit function", () => {
    const { id, ...newBook } = book;
    dialogRefSpy.afterClosed.and.returnValue(of(newBook));
    spyOn(bookService, "editBook").and.returnValue(of({}));

    component.edit(book);

    expect(bookService.editBook).toHaveBeenCalled();
    expect(matDialogSpy.open).toHaveBeenCalled();
    expect(snackBarSpy.showSuccess).toHaveBeenCalled();
  });

  it("should call the edit function with errors", () => {
    const { id, ...newBook } = book;
    dialogRefSpy.afterClosed.and.returnValue(of(newBook));
    spyOn(bookService, "editBook").and.returnValue(throwError({}));

    component.edit(book);

    expect(bookService.editBook).toHaveBeenCalled();
    expect(matDialogSpy.open).toHaveBeenCalled();
    expect(snackBarSpy.showError).toHaveBeenCalled();
  });

  it("should show book details", () => {
    component.showDetails(book);
    expect(matDialogSpy.open).toHaveBeenCalled();
  });

  it("should find a match when user filters", fakeAsync(() => {
    spyOn(bookService, "fetchBooks").and.returnValue(of([book]));
    spyOnProperty(bookService, "searchText$").and.returnValue(of("title"));
    spyOn(component, "getAllBooks");
    fixture.detectChanges();
    flush();
    expect(component.getAllBooks).toHaveBeenCalledWith("title");
  }));
});

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
  });

  it("should fetch all readers", () => {
    readersServiceSpy.getReaders.and.returnValue(of([reader]));
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.showSpinner).toBe(false);
    expect(component.filteredReaders).toEqual([reader]);
    expect(component.allReaders).toEqual([reader]);
  });

  it("should fail to fetch all readers", () => {
    readersServiceSpy.getReaders.and.returnValue(throwError("error"));
    fixture.detectChanges();
    expect(snackBarServiceSpy.showError).toHaveBeenCalledWith("error");
    expect(component.showSpinner).toBe(false);
  });

  it("should add user successfully", () => {
    const spy = jasmine.createSpyObj("dialogRef", ["afterClosed"]);
    dialogSpy.open.and.returnValue(spy);
    spy.afterClosed.and.returnValue(of([reader]));
    readersServiceSpy.addReader.and.returnValue(of({}));
    fixture.detectChanges();
    component.addReader();
    expect(dialogSpy.open).toHaveBeenCalled();
    expect(readersServiceSpy.addReader).toHaveBeenCalled();
    expect(snackBarServiceSpy.showSuccess).toHaveBeenCalledWith(
      "User added successfully"
      );
    });
    it("should fail to add a reader", () => {
      const dialogRefSpy = jasmine.createSpyObj("dialogRef", ["afterClosed"]);
      dialogSpy.open.and.returnValue(dialogRefSpy);
      dialogRefSpy.afterClosed.and.returnValue(of([reader]));
      readersServiceSpy.addReader.and.returnValue(throwError("error"));
      fixture.detectChanges();
      component.addReader();
      expect(dialogSpy.open).toHaveBeenCalled();
      expect(dialogRefSpy.afterClosed).toHaveBeenCalled();
      expect(readersServiceSpy.addReader).toHaveBeenCalled();
      expect(snackBarServiceSpy.showError).toHaveBeenCalledWith("error");
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

    it('should find match when user filters list',()=>{
      readersServiceSpy.getReaders.and.returnValue(of([reader]));
      spyOnProperty(bookService, "searchText$").and.returnValue(of("Joshua"));
      fixture.detectChanges()
      expect(component.filteredReaders).toEqual([reader])
    })

    it('should not find match when user filters list',()=>{
      readersServiceSpy.getReaders.and.returnValue(of([reader]));
      spyOnProperty(bookService, "searchText$").and.returnValue(of("asca"));
      fixture.detectChanges()
      expect(component.filteredReaders).toEqual([])
    })
});

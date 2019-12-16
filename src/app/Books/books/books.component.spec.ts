import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BooksComponent } from "./books.component";
import { MaterialModule } from "src/app/material.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BooksService } from '../books.service';
import { of, throwError } from 'rxjs';

describe("BooksComponent", () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let bookServiceSpy = jasmine.createSpyObj("BookService", [
    "fetchBooks",
    "lendOutBook",
    "reportBook"
  ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BooksComponent],
      imports: [MaterialModule],
      providers:[{provide: BooksService, useValue:bookServiceSpy}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    bookServiceSpy.fetchBooks.and.returnValue(of([]))
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it('should return error when calling fetchBooks function',()=>{
    bookServiceSpy.fetchBooks.and.returnValue(throwError({}))
    fixture.detectChanges()
  })
});

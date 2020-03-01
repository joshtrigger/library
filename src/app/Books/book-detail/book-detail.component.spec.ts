import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailComponent } from './book-detail.component';
import { Book } from 'src/app/interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let dialogRefSpy = jasmine.createSpyObj('MatDialogRef',['close'])
  const book: Book = {
    id: 1,
    authors: "josh",
    title: "title",
    release_date: "12-09-2019",
    isbn: "123-34-54",
    publisher: "MK",
    count: 1,
    imageUrl: "/path/file",
    about: "something",
    edition: "1st"
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDetailComponent ],
      providers:[
        {provide: MatDialogRef, useValue: dialogRefSpy},
        {provide: MAT_DIALOG_DATA, useValue:book}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should close the modal',()=>{
    component.closeModal()
    expect(dialogRefSpy.close).toHaveBeenCalled()
  })
});

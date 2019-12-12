import { Component, OnInit } from "@angular/core";
import { BooksService } from "../books.service";
import { Book } from "src/app/interfaces";
import { MatDialog } from '@angular/material/dialog';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.scss"]
})
export class BooksComponent implements OnInit {
  books: Array<Book>;

  constructor(private bookService: BooksService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getAllBooks();
  }

  getAllBooks(): void {
    this.bookService.fetchBooks().subscribe(
      value => (this.books = value),
      err => console.log(err)
    );
  }

  lend(bookId){
    this.bookService.lendOutBook(bookId).subscribe(
      value=>console.log(value),
      err=>console.log(err)
    )
  }
  
  report(bookId){
    this.dialog.open(ReportDialogComponent,{
      width: '250px'
    })
  }

  addBook(){}
}

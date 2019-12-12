import { Component, OnInit } from "@angular/core";
import { BooksService } from "../books.service";
import { Book } from "src/app/interfaces";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.scss"]
})
export class BooksComponent implements OnInit {
  books: Array<Book>;

  constructor(private bookService: BooksService) {}

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
    console.log(bookId)
  }

  report(bookId){
    console.log(bookId)
  }
}

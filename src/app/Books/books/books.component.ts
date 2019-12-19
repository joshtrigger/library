import { Component, OnInit } from "@angular/core";
import { BooksService } from "../books.service";
import { Book } from "src/app/interfaces";
import { MatDialog } from "@angular/material/dialog";
import { ReportDialogComponent } from "../report-dialog/report-dialog.component";
import { SnackBarService } from "src/app/services/snack-bar.service";
import { AddBookComponent } from "../add-book/add-book.component";

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.scss"]
})
export class BooksComponent implements OnInit {
  books: Array<Book>;

  constructor(
    private bookService: BooksService,
    public dialog: MatDialog,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.getAllBooks();
  }

  getAllBooks(): void {
    this.bookService.fetchBooks().subscribe(
      value => (this.books = value),
      err => console.log(err)
    );
  }

  lend(bookId) {}

  report(bookId) {
    const dialogRef = this.dialog.open(ReportDialogComponent, {
      width: "500px",
      height: "400px",
      data: bookId
    });

    dialogRef.afterClosed().subscribe(value => {
      this.bookService.reportBook(value).subscribe(
        () => this.snackBarService.showSuccess("Report has been sent"),
        err => {}
      );
    });
  }

  addBook() {
    const dialogRef = this.dialog.open(AddBookComponent, {
      width: "600px",
      height: "500px"
    });

    dialogRef.afterClosed().subscribe(value => {
      this.bookService.addBook(value).subscribe(
        () => this.snackBarService.showSuccess("Successfully added book"),
        err => this.snackBarService.showError(`Error while adding book ${err}`)
      );
    });
  }

  delete(bookId) {
    this.bookService.deleteBook(bookId).subscribe(
      value => console.log(value),
      err => console.log(err)
    );
  }
}

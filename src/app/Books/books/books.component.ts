import { Component, OnInit } from "@angular/core";
import { BooksService } from "../books.service";
import { Book } from "src/app/interfaces";
import { MatDialog } from "@angular/material/dialog";
import { ReportDialogComponent } from "../report-dialog/report-dialog.component";
import { SnackBarService } from "src/app/services/snack-bar.service";
import { AddBookComponent } from "../add-book/add-book.component";
import { ConfirmationDialogComponent } from "src/app/components/confirmation-dialog/confirmation-dialog.component";

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

  /**
   * this method fetches add the books available
   */
  getAllBooks(): void {
    this.bookService.fetchBooks().subscribe(
      value => (this.books = value),
      err =>
        this.snackBarService.showError("Error occured when fetching records")
    );
  }

  lend(bookId) {}

  /**
   * this method is reponsible for reporting a book
   *
   * @param bookId id of the book to be reported
   */
  report(bookId: number): void {
    const dialogRef = this.dialog.open(ReportDialogComponent, {
      width: "500px",
      height: "400px",
      data: bookId
    });

    dialogRef.afterClosed().subscribe(value => {
      this.bookService.reportBook(value).subscribe(
        () => this.snackBarService.showSuccess("Report has been sent"),
        err => {
          if (err.body.error !== "Cannot read property 'id' of null")
            this.snackBarService.showError(
              "Error occurred while sending report"
            );
        }
      );
    });
  }

  /**
   * this method adds new book
   */
  addBook(): void {
    const dialogRef = this.dialog.open(AddBookComponent, {
      width: "600px",
      height: "500px"
    });

    dialogRef.afterClosed().subscribe(value => {
      this.bookService.addBook(value).subscribe(
        () => this.snackBarService.showSuccess("Successfully added book"),
        err => {
          if (err.body.error !== "Cannot read property 'id' of null")
            this.snackBarService.showError("Error while adding book");
        }
      );
    });
  }

  /**
   * this method is responsible for deletion of a book
   *
   * @param bookId the id of the book to be deleted
   */
  delete(bookId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: "400px",
      height: "200px"
    });

    dialogRef.afterClosed().subscribe(value => {
      if (value === "confirmed") {
        this.bookService.deleteBook(bookId).subscribe(
          () => this.snackBarService.showSuccess("Book has been deleted"),
          err =>
            this.snackBarService.showError(
              "Error occurred when performing action"
            )
        );
      }
    });
  }

  /**
   * this method is reponsible for editing a specific book
   * information
   *
   * @param book this is the information of the book that
   * is being edited by the user
   */
  edit(book: Book) {
    console.log(book);
  }
}

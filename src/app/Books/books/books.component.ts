import { Component, OnInit, OnDestroy } from "@angular/core";
import { BooksService } from "../books.service";
import { Book } from "src/app/interfaces";
import { MatDialog } from "@angular/material/dialog";
import { ReportDialogComponent } from "../report-dialog/report-dialog.component";
import { SnackBarService } from "src/app/services/snack-bar.service";
import { AddBookComponent } from "../add-book/add-book.component";
import { ConfirmationDialogComponent } from "src/app/components/confirmation-dialog/confirmation-dialog.component";
import { Subscription, interval } from "rxjs";
import { debounce } from "rxjs/operators";
import { LendBookComponent } from "../lend-book/lend-book.component";
import { BookDetailComponent } from '../book-detail/book-detail.component';

@Component({
  selector: "app-books",
  templateUrl: "./books.component.html",
  styleUrls: ["./books.component.scss"]
})
export class BooksComponent implements OnInit, OnDestroy {
  books: Array<Book>;
  sub: Subscription;
  showSpinner: boolean;

  constructor(
    private bookService: BooksService,
    public dialog: MatDialog,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.getAllBooks();
    this.performFilter();
  }

  /**
   * this method is responsible for filtering through the
   * available books
   */
  private performFilter(): void {
    this.sub = this.bookService.searchText$
      .pipe(debounce(() => interval(2000)))
      .subscribe(val => {
        this.getAllBooks(val);
      });
  }

  /**
   * this method fetches add the books available
   */
  getAllBooks(arg?: string): void {
    this.showSpinner = true;
    this.bookService.fetchBooks(arg).subscribe(
      value => {
        this.books = value;
        this.showSpinner = false;
      },
      err => {
        this.showSpinner = false;
        this.snackBarService.showError("Error occured when fetching records");
      }
    );
  }

  lend(bookId) {
    const dialogRef = this.dialog.open(LendBookComponent, {
      width: "500px",
      height: "350px",
      data: bookId
    });

    dialogRef.afterClosed().subscribe(val => {
      if (val !== "closed") {
        this.bookService.lendOutBook(val).subscribe(
          () => this.snackBarService.showSuccess("Success"),
          err => this.snackBarService.showError(err)
        );
      }
    });
  }

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
      height: "500px",
      data: { title: "add book" }
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
    const dialogRef = this.dialog.open(AddBookComponent, {
      width: "600px",
      height: "500px",
      data: { book, title: "edit book" }
    });
    const { id } = book;

    dialogRef.afterClosed().subscribe(val => {
      const newDate = JSON.stringify(val.release_date)
        .slice(1, 11)
        .split("-")
        .reverse()
        .join("-");
      val.id = id;
      val.release_date = newDate;

      this.bookService.editBook(id, val).subscribe(
        () => this.snackBarService.showSuccess("Book has been updated"),
        err =>
          this.snackBarService.showError("Error occured when updating the book")
      );
    });
  }

  /**
   * this method is responsible for displaying the details of a
   * specific book.
   *
   * @param book the book whose information is being displayed to
   * the user
   */
  showDetails(book: Book): void {
    this.dialog.open(BookDetailComponent,{
      width:'450px',
      height:'700px',
      data: book
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

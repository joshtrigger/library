import { Component, OnInit, OnDestroy } from "@angular/core";
import { ReadersService } from "../readers.service";
import { Reader } from "src/app/interfaces";
import { BooksService } from "src/app/Books/books.service";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material";
import { AddReaderComponent } from "../add-reader/add-reader.component";
import { SnackBarService } from "src/app/services/snack-bar.service";

@Component({
  selector: "app-readers",
  templateUrl: "./readers.component.html",
  styleUrls: ["./readers.component.scss"]
})
export class ReadersComponent implements OnInit, OnDestroy {
  allReaders: Reader[];
  filteredReaders: Reader[];
  columnsToDisplay: string[] = [
    "avatar",
    "name",
    "email",
    "idNo.",
    "idType",
    "phoneNumber",
    "booksBorrowed"
  ];
  sub: Subscription;
  showSpinner: boolean;

  constructor(
    private readersService: ReadersService,
    private bookService: BooksService,
    private dialog: MatDialog,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.fetchReaders();
    this.performFilter();
  }

  private performFilter() {
    this.sub = this.bookService.searchText$.subscribe(val => {
      this.filteredReaders = this.allReaders.filter(reader => {
        if (reader.name.includes(val)) {
          return true;
        }
        return false;
      });
    });
  }

  fetchReaders(): void {
    this.showSpinner = true;
    this.readersService.getReaders().subscribe(
      val => {
        this.allReaders = val;
        this.filteredReaders = val;
        this.showSpinner = false;
      },
      err => {
        this.snackBarService.showError(err);
        this.showSpinner = false;
      }
    );
  }

  addReader(): void {
    const dialogRef = this.dialog.open(AddReaderComponent, {
      width: "550px",
      height: "500px"
    });

    dialogRef.afterClosed().subscribe(reader => {
      if (reader !== "closed") {
        this.readersService.addReader(reader).subscribe(
          () => this.snackBarService.showSuccess("User added successfully"),
          err => this.snackBarService.showError(err)
        );
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

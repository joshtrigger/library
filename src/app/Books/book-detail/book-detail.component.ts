import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Book } from "src/app/interfaces";
import { BooksService } from '../books.service';

@Component({
  selector: "app-book-detail",
  templateUrl: "./book-detail.component.html",
  styleUrls: ["./book-detail.component.scss"]
})
export class BookDetailComponent implements OnInit {
  book: Book;

  constructor(
    public dialogRef: MatDialogRef<BookDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book
  ) {}

  ngOnInit() {
    this.book = this.data;
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}

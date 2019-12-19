import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-add-book",
  templateUrl: "./add-book.component.html",
  styleUrls: ["./add-book.component.scss"]
})
export class AddBookComponent implements OnInit {
  title: String;
  authors: String;
  publisher: String;
  edition: String;
  isbn: String;
  release_date: String;
  about: String;

  constructor(public dialogRef: MatDialogRef<AddBookComponent>) {}

  ngOnInit() {}

  closeModal() {
    this.dialogRef.close();
  }

  addBook() {
    const {
      title,
      authors,
      publisher,
      edition,
      isbn,
      release_date,
      about
    } = this;
    const data = {
      title,
      authors,
      publisher,
      edition,
      isbn,
      release_date,
      about
    };
    this.dialogRef.close(data);
  }
}

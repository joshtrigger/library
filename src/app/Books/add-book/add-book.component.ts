import { Component, OnInit, Input, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Book } from "src/app/interfaces";

@Component({
  selector: "app-add-book",
  templateUrl: "./add-book.component.html",
  styleUrls: ["./add-book.component.scss"]
})
export class AddBookComponent implements OnInit {
  addBookForm: FormGroup;
  modalTitle: String;
  // @Input() book : Book

  constructor(
    public dialogRef: MatDialogRef<AddBookComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    const { title, book } = this.data;
    this.modalTitle = title;
    if (title === "add book") {
      this.addBookForm = this.fb.group({
        title: ["", Validators.required],
        authors: ["", Validators.required],
        publisher: ["", Validators.required],
        edition: ["", Validators.required],
        isbn: ["", Validators.required],
        release_date: ["", Validators.required],
        about: ["", Validators.required]
      });
    } else {
      this.addBookForm = this.fb.group({
        title: [book.title, Validators.required],
        authors: [book.authors, Validators.required],
        publisher: [book.publisher, Validators.required],
        edition: [book.edition, Validators.required],
        isbn: [book.isbn, Validators.required],
        release_date: [book.release_date, Validators.required],
        about: [book.about, Validators.required]
      });
    }
  }

  closeModal() {
    this.dialogRef.close();
  }

  save() {
    const data = this.addBookForm.value;
    console.log(data)
    // this.dialogRef.close(data);
  }
}

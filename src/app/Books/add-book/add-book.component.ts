import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-add-book",
  templateUrl: "./add-book.component.html",
  styleUrls: ["./add-book.component.scss"]
})
export class AddBookComponent implements OnInit {
  addBookForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddBookComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.addBookForm = this.fb.group({
      title: ["", Validators.required],
      authors: ["", Validators.required],
      publisher: ["", Validators.required],
      edition: ["", Validators.required],
      isbn: ["", Validators.required],
      release_date: ["", Validators.required],
      about: ["", Validators.required]
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  addBook() {
    const data = this.addBookForm.value;
    this.dialogRef.close(data);
  }
}

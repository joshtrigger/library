import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ReadersService } from "src/app/readers/readers.service";
import { Reader } from "src/app/interfaces";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: "app-lend-book",
  templateUrl: "./lend-book.component.html",
  styleUrls: ["./lend-book.component.scss"]
})
export class LendBookComponent implements OnInit {
  readers: Reader[];
  date = new Date();
  lendForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LendBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private readerService: ReadersService,
    private fb: FormBuilder,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit() {
    this.fetchAllReaders();
    this.lendForm = this.fb.group({
      readerId: [null, [Validators.required]],
      issuingDate: [this.date, [Validators.required]],
      returnDate: ["", [Validators.required]]
    });
  }

  closeModal(): void {
    this.dialogRef.close("closed");
  }

  fetchAllReaders(): void {
    this.readerService.getReaders().subscribe(
      val => (this.readers = val),
      err => this.snackBarService.showError(err)
    );
  }

  private dateConverter(date: object): string {
    const newDate = JSON.stringify(date);
    return newDate
      .slice(1, 11)
      .split("-")
      .reverse()
      .join("-");
  }

  lendBook(): void {
    const { readerId, issuingDate, returnDate } = this.lendForm.value;
    const { user:{id} } = JSON.parse(localStorage.getItem("currentUser"));
    const data = {
      book_id: this.data,
      reader_id: readerId,
      date_issued: this.dateConverter(issuingDate),
      return_date: this.dateConverter(returnDate),
      librarian_id: id
    };
    this.dialogRef.close(data);
  }
}

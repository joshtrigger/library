import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-report-dialog",
  templateUrl: "./report-dialog.component.html",
  styleUrls: ["./report-dialog.component.scss"]
})
export class ReportDialogComponent implements OnInit {
  statuses: Array<object> = [
    { value: "Under repair" },
    { value: "Processing" }
  ];
  types: Array<object> = [
    { value: "Out of stock" },
    { value: "Missing" },
    { value: "Damaged" }
  ];
  type: String;
  status: String;
  comment: String;

  constructor(
    public dialogRef: MatDialogRef<ReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Number
  ) {}

  ngOnInit() {}

  closeModal() {
    this.dialogRef.close();
  }

  sendReport() {
    const details = {
      book_id: this.data,
      type: this.type,
      status: this.status,
      notes: this.comment
    };
    this.dialogRef.close(details);
  }
}

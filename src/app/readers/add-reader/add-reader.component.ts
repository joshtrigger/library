import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-add-reader",
  templateUrl: "./add-reader.component.html",
  styleUrls: ["./add-reader.component.scss"]
})
export class AddReaderComponent implements OnInit {
  addUserForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddReaderComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    const re = /\S+@\S+\.\S+/;
    this.addUserForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.pattern(re)]],
      idNumber: ["", [Validators.required]],
      idType: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required, Validators.minLength(10)]]
    });
  }

  closeModal(): void {
    this.dialogRef.close('closed');
  }

  saveUser(): void {
    const {
      name,
      email,
      idNumber,
      idType,
      phoneNumber
    } = this.addUserForm.value;
    const data = {
      name,
      email,
      id_no: idNumber,
      id_type: idType,
      phone_number: phoneNumber
    };
    this.dialogRef.close(data)
  }
}

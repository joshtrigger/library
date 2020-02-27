import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from "@angular/forms";
import { MatSelect } from "@angular/material";

interface Option {
  value: string;
}
@Component({
  selector: "app-add-reader",
  templateUrl: "./add-reader.component.html",
  styleUrls: ["./add-reader.component.scss"]
})
export class AddReaderComponent implements OnInit {
  addUserForm: FormGroup;
  options: Option[] = [
    { value: "Student ID" },
    { value: "Employer ID" },
    { value: "National ID" },
    { value: "Driving permit" },
    { value: "Other specify" }
  ];
  idSpecification: boolean = false;
  validationMessage: string;
  @ViewChild(MatSelect, { static: false }) public matSelect: MatSelect;

  constructor(
    public dialogRef: MatDialogRef<AddReaderComponent>,
    private fb: FormBuilder
  ) {}

  private inputErrors = {
    required: "This field is required",
    pattern: "Enter a valid email"
  };

  ngOnInit() {
    const re = /\S+@\S+\.\S+/;
    this.addUserForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.pattern(re)]],
      idNumber: ["", [Validators.required]],
      idType: ["", [Validators.required]],
      specification: "",
      phoneNumber: ["", [Validators.required, Validators.minLength(10)]]
    });

    this.addUserForm.valueChanges.subscribe(v => {
      this.idSpecification = v.idType === "Other specify" ? true : false;
      this.setMessage(this.addUserForm);
    });
  }

  closeModal(): void {
    this.dialogRef.close("closed");
  }

  saveUser(): void {
    const {
      name,
      email,
      idNumber,
      idType,
      phoneNumber,
      specification
    } = this.addUserForm.value;
    const data = {
      name,
      email,
      id_no: idNumber,
      id_type: `${idType} ${specification}`,
      phone_number: phoneNumber
    };
    this.dialogRef.close(data);
  }

  /**
   * This method is responsible for setting the validation messages
   * by matching the keys of the [[inputErrors]] object with those
   * from the errors collection of the form control or form group.
   *
   * @param c - form group
   */
  setMessage(form: AbstractControl): void {
    this.validationMessage = "";
    const controls = [
      form.get("name"),
      form.get("email"),
      form.get("idNumber"),
      form.get("idType"),
      form.get("phoneNumber")
    ];
    for (let c of controls) {
      if (c && (c.touched || c.dirty) && c.errors) {
        this.validationMessage = Object.keys(c.errors)
          .map(key => (this.validationMessage += this.inputErrors[key]))
          .join(" ");
      }
    }
  }
}

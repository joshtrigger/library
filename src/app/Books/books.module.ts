import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BooksComponent } from "./books/books.component";
import { BooksRoutingModule } from "./books-routing.module";
import { MaterialModule } from "../material.module";
import { ReportDialogComponent } from "./report-dialog/report-dialog.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddBookComponent } from "./add-book/add-book.component";

@NgModule({
  declarations: [BooksComponent, ReportDialogComponent, AddBookComponent],
  imports: [CommonModule, BooksRoutingModule, MaterialModule, FormsModule, ReactiveFormsModule],
  entryComponents: [ReportDialogComponent, AddBookComponent]
})
export class BooksModule {}

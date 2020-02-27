import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BooksComponent } from "./books/books.component";
import { BooksRoutingModule } from "./books-routing.module";
import { MaterialModule } from "../material.module";
import { ReportDialogComponent } from "./report-dialog/report-dialog.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddBookComponent } from "./add-book/add-book.component";
import { LendBookComponent } from "./lend-book/lend-book.component";
import { BookDetailComponent } from "./book-detail/book-detail.component";

@NgModule({
  declarations: [
    BooksComponent,
    ReportDialogComponent,
    AddBookComponent,
    LendBookComponent,
    BookDetailComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ReportDialogComponent,
    AddBookComponent,
    LendBookComponent,
    BookDetailComponent
  ]
})
export class BooksModule {}

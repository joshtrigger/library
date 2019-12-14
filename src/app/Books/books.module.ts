import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BooksComponent } from "./books/books.component";
import { BooksRoutingModule } from "./books-routing.module";
import { MaterialModule } from '../material.module';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BooksComponent, ReportDialogComponent],
  imports: [CommonModule, BooksRoutingModule, MaterialModule, FormsModule],
  entryComponents:[ReportDialogComponent]
})
export class BooksModule {}

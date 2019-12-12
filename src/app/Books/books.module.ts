import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BooksComponent } from "./books/books.component";
import { BooksRoutingModule } from "./books-routing.module";
import { MaterialModule } from '../material.module';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';

@NgModule({
  declarations: [BooksComponent, ReportDialogComponent],
  imports: [CommonModule, BooksRoutingModule, MaterialModule],
  entryComponents:[ReportDialogComponent]
})
export class BooksModule {}

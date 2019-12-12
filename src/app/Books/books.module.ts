import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BooksComponent } from "./books/books.component";
import { BooksRoutingModule } from "./books-routing.module";
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [BooksComponent],
  imports: [CommonModule, BooksRoutingModule, MaterialModule]
})
export class BooksModule {}

import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BooksComponent } from "./books/books.component";

const routes = [{ path: "books", component: BooksComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule {}

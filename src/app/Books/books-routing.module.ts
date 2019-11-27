import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { BooksComponent } from "./books/books.component";
import { AuthGuard } from "../guards/auth.guard";

const routes = [
  { path: "books", component: BooksComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule {}

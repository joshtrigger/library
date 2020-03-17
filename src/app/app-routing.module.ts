import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: "books",
    canActivate:[AuthGuard],
    loadChildren: () =>
    import("./Books/books.module").then(mod => mod.BooksModule)
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(mod => mod.AuthModule)
  },
  {
    path: "readers",
    canActivate:[AuthGuard],
    loadChildren: () =>
      import("./readers/readers.module").then(mod => mod.ReadersModule)
  },
  { path: "", redirectTo: "auth/login", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

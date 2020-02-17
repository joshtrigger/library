import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReadersComponent } from './readers/readers.component';


const routes: Routes = [
  {path:'', component: ReadersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReadersRoutingModule { }

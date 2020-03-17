import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReadersRoutingModule } from "./readers-routing.module";
import { ReadersComponent } from "./readers/readers.component";
import { MaterialModule } from "../material.module";
import { NgSanLetterIconModule } from "ng-san-letter-icon";
import { AddReaderComponent } from './add-reader/add-reader.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ReadersComponent, AddReaderComponent],
  imports: [
    CommonModule,
    ReadersRoutingModule,
    MaterialModule,
    NgSanLetterIconModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents:[AddReaderComponent]
})
export class ReadersModule {}

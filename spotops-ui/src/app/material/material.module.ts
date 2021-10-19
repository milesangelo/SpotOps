import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from "@angular/material/toolbar";

const material = [
  MatButtonModule,
  MatToolbarModule
]

@NgModule({
  exports: [ material ],
  imports: [ material ]
})
export class MaterialModule { }

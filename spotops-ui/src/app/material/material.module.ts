import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCommonModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

const material = [
  MatCommonModule,
  MatButtonModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatInputModule,
  MatCardModule
]

@NgModule({
  exports: [ material ],
  imports: [ material ]
})
export class MaterialModule { }

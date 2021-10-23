import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-spotform',
  templateUrl: './spotform.component.html',
  styleUrls: ['./spotform.component.css']
})
export class SpotFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  spotTypes: string[] = ['Street', 'Park', 'Rail'];

  spotFormGroup: FormGroup = this.formBuilder.group({
    spotName: ['', Validators.required],
    spotType: [''],
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['']
    }),
  });

  ngOnInit(): void {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.spotFormGroup.value);
  }

  onUpdate() {
    // TODO: Use EventEmitter with form value
    this.spotFormGroup.patchValue({
      address: {
        street: '123 example st',
        state: 'PA'
      }
    });

    console.warn('Patched ', this.spotFormGroup.value);
  }
}

import { Component, OnInit } from '@angular/core';
import { SpotService } from 'src/app/shared/services/spot/spot.service';

@Component({
  selector: 'app-spot-form',
  templateUrl: './spot-form.component.html',
  styleUrls: ['./spot-form.component.css']
})
export class SpotFormComponent implements OnInit {

  constructor(public spotService: SpotService) { }

  ngOnInit(): void {
  }

}

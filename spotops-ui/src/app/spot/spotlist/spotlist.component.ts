import {Component} from '@angular/core';

export interface Spot {
  name: string;
  type: string;
  location: string;
  dateCreated: string;
}

const SPOT_DATA: Spot[] = [
  {name: 'Love Park', type: 'Street', location:'Philadelphia, PA', dateCreated: '10/10/2020'},
  {name: 'Woodward', type: 'Park', location:'Boulder, CO', dateCreated: '12/14/2019'}
];
@Component({
  selector: 'app-spotlist',
  styleUrls: ['spotlist.component.css'],
  templateUrl: 'spotlist.component.html',
})

export class SpotlistComponent {
  displayedColumns: string[] = ['name', 'dateCreated', 'type', 'location'];
  dataSource = SPOT_DATA;
}


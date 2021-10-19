import { Injectable } from '@angular/core';
import { Spot } from '../../models/spot/spot.model';

@Injectable({
  providedIn: 'root'
})
export class SpotService {
  readonly baseURL = 'http://localhost:5000/api/spot';
  formData:Spot = new Spot();

  constructor() { }
  
}

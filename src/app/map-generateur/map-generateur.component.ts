import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-map-generateur',
  templateUrl: './map-generateur.component.html',
  styleUrls: ['./map-generateur.component.scss']
})
export class MapGenerateurComponent implements OnInit {
  CircleVisible = true;
  constructor(private _dataService: DataService) {}

  ngOnInit() {}

  circles() {
    console.log(this.CircleVisible);
    this._dataService.sendMapGenerateur({
      CircleVisible: this.CircleVisible
    });
  }
}

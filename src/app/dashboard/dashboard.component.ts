import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Endroit } from '../map/endroit';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  themes = ['light-theme', 'dark-theme', 'light-theme2', 'dark-theme2'];
  theme = 'dark-theme';
  selectedEndroitName: string;
  constructor(
    private overlayContainer: OverlayContainer,
    private _dataService: DataService
  ) {
    this.overlayContainer.getContainerElement().classList.add(this.theme);
  }
  ngOnInit(): void {}
  onthemeChange(theme): void {
    this.theme = theme;
    for (const th of this.themes) {
      this.overlayContainer.getContainerElement().classList.remove(th);
    }
    this.overlayContainer.getContainerElement().classList.add(theme);
  }

  change(event) {
    this.selectedEndroitName = event;
  }
}

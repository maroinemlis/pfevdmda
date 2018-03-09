import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {
  themes = ['light-theme', 'dark-theme', 'light-theme2', 'dark-theme2'];
  theme = 'dark-theme';
  selectedEndroitName: string;
  constructor(
    private overlayContainer: OverlayContainer,
    private _dataService: DataService
  ) {
    this.overlayContainer.getContainerElement().classList.add(this.theme);
  }
  themeChange(theme): void {
    this.theme = theme;
    for (const th of this.themes) {
      this.overlayContainer.getContainerElement().classList.remove(th);
    }
    this.overlayContainer.getContainerElement().classList.add(theme);
  }
}

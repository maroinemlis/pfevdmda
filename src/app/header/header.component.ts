import { Component, OnInit, Input, Output } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { EventEmitter } from '@angular/core';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  /* languages */
  titleText: string;
  languageText: String = 'Francais';
  /*languages*/
  @Input() sidenav: MatSidenav;
  @Output() onthemeChange = new EventEmitter<string>();
  theme = 'light-theme';
  constructor(private _dataService: DataService) {
    /* languages */
    this.titleText = this._dataService.getTextOf('title', this.languageText);
    this._dataService.getLanguage().subscribe(language => {
      this.languageText = language;
      this.titleText = this._dataService.getTextOf('title', this.languageText);
    });
    /* languages */
  }

  ngOnInit() {}

  themeChange(theme: string) {
    this.onthemeChange.emit(theme);
  }

  changeLanguage(language) {
    this._dataService.sendLanguage(language);
  }
}

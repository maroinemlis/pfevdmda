import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Endroit } from '../map/endroit';
import { Subscription } from 'rxjs/Subscription';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-generateur',
  templateUrl: './generateur.component.html',
  styleUrls: ['./generateur.component.scss']
})
export class GenerateurComponent implements OnInit {
  index: any;
  categoryFields: any[];
  graphs: any[];
  providers: any[];
  selectedEndroitName: String;
  sujet = ['Population', 'autre'];
  genre = ['homme', 'femme'];

  age = [
    '00-04',
    '05-09',
    '10-14',
    '15-19',
    '20-24',
    '25-29',
    '30-34',
    '35-39',
    '40-44',
    '45-59',
    '50-54',
    '55-59',
    '60-64',
    '65-59',
    '70-74',
    '75-79',
    '85 &+'
  ];

  annee = [
    '2000',
    '2001',
    '2002',
    '2003',
    '2004',
    '2005',
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2017',
    '2018'
  ];
  pays = ['Tunisia'];
  gouvernate = ['Sousse'];
  delegation = ['Msaken'];
  dimensions = [
    { name: 'Sujet', elements: this.sujet },
    { name: 'Année', elements: this.annee },
    { name: 'Pays', elements: this.pays },
    { name: 'Gouvernate', elements: this.gouvernate },
    { name: 'Délégation', elements: this.delegation },
    { name: 'Genre', elements: this.genre },
    { name: 'Age', elements: this.age }
  ];
  optionBinders = [[], [], [], [], [], [], []];
  subscription: Subscription;
  rad = this.dimensions[0].name;
  constructor(private _dataService: DataService) {}
  ngOnInit(): void {
    this.subscription = this._dataService.getEndroit().subscribe(endroit => {
      this.selectedEndroitName = endroit;
    });
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  myIndexOf(rad): number {
    for (let i = 0; i < this.dimensions.length; i++) {
      const element = this.dimensions[i].name;
      if (element === rad) {
        return i;
      }
    }
  }

  f() {
    this.providers = [];
    this.graphs = [];
    this.categoryFields = [];

    for (let k = 0; k < this.optionBinders.length - 1; k++) {
      const provider = [];
      for (let i = 0; i < this.optionBinders[k].length; i++) {
        const element = this.optionBinders[k][i];
        const obj = {};
        obj[this.dimensions[k].name] = element;

        for (let j = 0; j < this.optionBinders[k + 1].length; j++) {
          const el = this.optionBinders[k + 1][j];
          obj[el] = Math.floor(Math.random() * 1000);
        }
        provider.push(obj);
      }
      const graph = [];
      this.categoryFields.push(this.dimensions[k].name);
      if (provider.length) {
        const keys = Object.keys(provider[0]);
        for (const key of keys) {
          if (key !== this.dimensions[k].name) {
            graph.push({
              balloonText:
                '<b>[[title]]</b><br><span style="font-size:14px">[[category]]: <b>[[value]]</b></span>',
              fillAlphas: 0.8,
              labelText: '[[value]]',
              lineAlpha: 0.3,
              title: key,
              type: 'column',
              color: '#FFFFFF',
              valueField: key
            });
          }
        }
      }
      this.graphs.push(graph);
      this.providers.push(provider);
    }

    this._dataService.sendProviders({
      providers: this.providers,
      graphs: this.graphs,
      categoryFields: this.categoryFields,
      index: this.myIndexOf(this.rad),
      selectedEndroitName: this.selectedEndroitName
    });
  }
}

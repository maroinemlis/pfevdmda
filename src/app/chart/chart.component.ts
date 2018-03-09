import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { AmChart, AmChartsService } from '@amcharts/amcharts3-angular';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit, OnDestroy {
  obj: any;
  subscription: Subscription;
  @ViewChild('chartId1') chartId;
  private chart: AmChart;
  cfg: any;
  constructor(
    private AmCharts: AmChartsService,
    private _dataService: DataService
  ) {}

  ngAfterViewInit() {
    this.cfg = {
      startEffect: 'easeInSine',
      type: 'serial',
      theme: 'light',
      depth3D: 10,
      angle: 10,
      legend: {
        horizontalGap: 20,
        useGraphSettings: true,
        markerSize: 20,
        align: 'center',
        color: '#FFFFFF'
      },
      dataProvider: [
        {
          annee: 2000,
          homme: 10,
          femme: 20
        },
        {
          annee: 2001,
          homme: 15,
          femme: 30
        },
        {
          annee: 2002,
          homme: 16,
          femme: 33
        },
        {
          annee: 2003,
          homme: 16,
          femme: 33
        },
        {
          annee: 2004,
          homme: 16,
          femme: 33
        },
        {
          annee: 2005,
          homme: 16,
          femme: 33
        },
        {
          annee: 2006,
          homme: 16,
          femme: 33
        },
        {
          annee: 2007,
          homme: 16,
          femme: 33
        },
        {
          annee: 2008,
          homme: 16,
          femme: 33
        },
        {
          annee: 2009,
          homme: 16,
          femme: 33
        },
        {
          annee: 2010,
          homme: 16,
          femme: 33
        },
        {
          annee: 2011,
          homme: 16,
          femme: 33
        },
        {
          annee: 2012,
          homme: 16,
          femme: 33
        },
        {
          annee: 2013,
          homme: 16,
          femme: 33
        },
        {
          annee: 2014,
          homme: 16,
          femme: 33
        },
        {
          annee: 2015,
          homme: 16,
          femme: 33
        },
        {
          annee: 2016,
          homme: 16,
          femme: 33
        },
        {
          annee: 2017,
          homme: 16,
          femme: 33
        }
      ],

      graphs: [
        {
          balloonText:
            '<b>[[title]]</b><br><span style="font-size:14px">[[category]]: <b>[[value]]</b></span>',
          fillAlphas: 0.8,
          labelText: '[[value]]',
          lineAlpha: 0.3,
          title: 'homme',
          type: 'column',
          color: '#FFFFFF',
          valueField: 'homme'
        },
        {
          balloonText:
            '<b>[[title]]</b><br><span style="font-size:14px">[[category]]: <b>[[value]]</b></span>',
          fillAlphas: 0.8,
          labelText: '[[value]]',
          lineAlpha: 0.3,
          title: 'femme',
          type: 'column',
          color: '#FFFFFF',
          valueField: 'femme'
        }
      ],
      categoryField: 'annee',
      color: '#FFFFFF'
    };
    this.chart = this.AmCharts.makeChart(this.chartId.nativeElement, this.cfg);

    this.subscription = this._dataService.getProviders().subscribe(obj => {
      this.obj = obj;
      this.obj = JSON.parse(JSON.stringify(obj));
      this.AmCharts.updateChart(this.chart, () => {
        this.chart.categoryField = this.obj.categoryFields[this.obj.index];
        this.chart.dataProvider = this.obj.providers[this.obj.index];
        this.chart.graphs = this.obj.graphs[this.obj.index];
      });
    });
  }

  ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }
}

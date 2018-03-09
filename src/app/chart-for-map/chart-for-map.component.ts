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
  selector: 'app-chart-for-map',
  templateUrl: './chart-for-map.component.html',
  styleUrls: ['./chart-for-map.component.scss']
})
export class ChartForMapComponent implements AfterViewInit, OnDestroy {
  obj: any;
  subscription: Subscription;
  @ViewChild('chartId') chartId;
  private chart: AmChart;
  cfg: any;
  cfgPie: any;
  constructor(
    private AmCharts: AmChartsService,
    private _dataService: DataService
  ) {}

  ngAfterViewInit() {
    this.cfg = {
      startEffect: 'easeInSine',
      type: 'serial',
      theme: 'dark',
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
      color: '#FFFFFF',
      export: {
        enabled: true
      },
      valueAxes: [
        {
          stackType: 'none',
          axisAlpha: 0.3,
          gridAlpha: 0
        }
      ],
      balloon: {
        fixedPosition: true
      },
      chartCursor: {
        valueBalloonsEnabled: false,
        cursorAlpha: 0.05,
        fullWidth: true
      },
      pathToImages: 'http://cdn.amcharts.com/lib/3/images/',
      chartScrollbar: {}
    };
    this.cfgPie = {
      type: 'pie',
      theme: 'light',
      dataProvider: [
        {
          country: 'Lithuania',
          litres: 501.9
        },
        {
          country: 'Czech Republic',
          litres: 301.9
        },
        {
          country: 'Ireland',
          litres: 201.1
        },
        {
          country: 'Germany',
          litres: 165.8
        },
        {
          country: 'Australia',
          litres: 139.9
        },
        {
          country: 'Austria',
          litres: 128.3
        },
        {
          country: 'UK',
          litres: 99
        },
        {
          country: 'Belgium',
          litres: 60
        },
        {
          country: 'The Netherlands',
          litres: 50
        }
      ],
      valueField: 'litres',
      titleField: 'country',
      balloon: {
        fixedPosition: true
      },
      export: {
        enabled: true
      }
    };
    this.chart = this.AmCharts.makeChart(this.chartId.nativeElement, this.cfg);

    this.subscription = this._dataService.getProviders().subscribe(obj => {
      this.obj = obj;

      this.AmCharts.updateChart(this.chart, () => {
        this.obj = JSON.parse(JSON.stringify(obj));
        this.chart.categoryField = this.obj.categoryFields[this.obj.index];
        this.chart.dataProvider = this.obj.providers[this.obj.index];
        this.chart.graphs = this.obj.graphs[this.obj.index];
        this.chart.titles = [
          {
            text: this.obj.selectedEndroitName,
            size: 15
          }
        ];
      });
    });
  }

  ngOnDestroy() {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }
}

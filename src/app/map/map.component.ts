import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  AfterViewInit,
  Injector,
  ApplicationRef,
  NgZone,
  ComponentRef
} from '@angular/core';
import { MonMap } from './mon-map';
import { DataService } from '../services/data.service';
import { Output, EventEmitter } from '@angular/core';
import { Endroit } from './endroit';
import { MatDialog } from '@angular/material';
import { ChartForMapComponent } from '../chart-for-map/chart-for-map.component';
import { GenerateurComponent } from '../generateur/generateur.component';
import { MapGenerateurComponent } from '../map-generateur/map-generateur.component';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Output() onendroitChange = new EventEmitter<string>();
  selectedEndroitName: string;
  div: HTMLDivElement;
  private url = '../assets/TUN_adm0.json';
  map: any;
  compRef: ComponentRef<ChartForMapComponent>;
  constructor(
    private _dataService: DataService,
    private injector: Injector,
    private resolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private zone: NgZone,
    public dialog: MatDialog
  ) {}

  openDialog() {
    this.dialog.open(ChartForMapComponent);
  }

  ngOnInit(): void {
    const style = [
      {
        elementType: 'geometry',
        stylers: [
          {
            color: '#212121'
          }
        ]
      },
      {
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#757575'
          }
        ]
      },
      {
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#212121'
          }
        ]
      },
      {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [
          {
            color: '#757575'
          }
        ]
      },
      {
        featureType: 'administrative.country',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#9e9e9e'
          }
        ]
      },
      {
        featureType: 'administrative.land_parcel',
        stylers: [
          {
            visibility: 'off'
          }
        ]
      },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#bdbdbd'
          }
        ]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#757575'
          }
        ]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [
          {
            color: '#181818'
          }
        ]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#616161'
          }
        ]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#1b1b1b'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#2c2c2c'
          }
        ]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#8a8a8a'
          }
        ]
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
          {
            color: '#373737'
          }
        ]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [
          {
            color: '#3c3c3c'
          }
        ]
      },
      {
        featureType: 'road.highway.controlled_access',
        elementType: 'geometry',
        stylers: [
          {
            color: '#4e4e4e'
          }
        ]
      },
      {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#616161'
          }
        ]
      },
      {
        featureType: 'transit',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#757575'
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          {
            color: '#000000'
          }
        ]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#3d3d3d'
          }
        ]
      }
    ];
    this.createDynamiqueComp();
    const mapProp = {
      zoom: 6,
      center: { lat: 35.764071, lng: 10.547165 },
      mapTypeId: 'satellite',
      disableDoubleClickZoom: true,
      scrollwheel: false,
      minZoom: 4,
      maxZoom: 15
    };
    this._dataService.getData(this.url).subscribe(responseData => {
      this.map = new MonMap(
        document.getElementById('mapId'),
        mapProp,
        responseData.features,
        this
      );
      const cc = this.createDynamiqueComponent(MapGenerateurComponent);
      this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(cc);
    });

    this._dataService.getMapGenerateur().subscribe(data => {
      this.map.setCircles(data.CircleVisible);
    });
  }

  endroitChange(endroit) {
    this.selectedEndroitName = endroit;
    document.getElementById('lol').click();
  }

  createDynamiqueComp() {
    const compFactory = this.resolver.resolveComponentFactory(
      ChartForMapComponent
    );
    this.compRef = compFactory.create(this.injector);

    this.appRef.attachView(this.compRef.hostView);

    this.div = document.createElement('div');
    this.div.style.cssText = 'height:400px;width:1024px';
    this.div.appendChild(this.compRef.location.nativeElement);
  }

  createDynamiqueComponent(component) {
    const compFactory = this.resolver.resolveComponentFactory(component);
    const compRef = compFactory.create(this.injector);

    this.appRef.attachView(compRef.hostView);

    const div = document.createElement('div');
    div.style.cssText = 'width:80% ;';
    div.appendChild(compRef.location.nativeElement);
    return div;
  }

  onclick() {
    this._dataService.sendEndroit(this.selectedEndroitName);
  }
}

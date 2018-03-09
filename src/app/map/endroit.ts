import { MonPolygon } from './mon-polygon';
import {} from '@types/googlemaps';
export class Endroit {
  icon: any;
  cityCircle: google.maps.Circle;
  name: any;
  zoom: number;
  color: string;
  infowindow: any;
  chart: any;
  polygons: MonPolygon[] = [];
  enfants: any[];
  niveau: any;
  parent: any;
  properties: any;
  map: any;
  visible: boolean;
  marker: any;
  constructor(properties, parent, niveau, map) {
    this.map = map;
    this.properties = properties;
    this.parent = parent; // un Endroits
    this.niveau = niveau;
    this.enfants = []; // des Endroits
    this.polygons = []; // des polygones qui constitue cette endroit
    this.setInfoFromLevel();
    const image = {
      url: 'download.png',
      opacity: 0
    };
    /*
    this.marker = new google.maps.Marker({
      position:{ this.properties.center},
      map: map,
      title: this.name,
      // draggable: true,
      icon: this.icon
    });*/

    this.drawCircle(this.properties.center);
    /*
    google.maps.event.addListener(this.marker, 'drag', e => {
      console.log('{"lat":', e.latLng.lat(), ',"lng":', e.latLng.lng(), '}');
    });*/
    this.cityCircle.setMap(null);
    // this.marker.setVisible(false);
    this.chart = this.map.chart;
    this.infowindow = this.map.infowindow;
  }

  setInfoFromLevel() {
    switch (this.niveau) {
      case 0:
        this.color = 'green';
        this.zoom = 6;
        this.name = this.properties.NAME_FAO;
        this.icon = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';
        break;
      case 1:
        this.color = 'green';
        this.zoom = 8;
        this.name = this.properties.NAME_0 + ', ' + this.properties.NAME_1;
        this.icon = 'https://maps.google.com/mapfiles/ms/icons/green-dot.png';
        break;
      case 2:
        this.color = 'black';
        this.zoom = 10;
        this.name =
          this.properties.NAME_0 +
          ', ' +
          this.properties.NAME_1 +
          ', ' +
          this.properties.NAME_2;
        this.icon = 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
        break;
    }
  }

  setClickable() {
    for (const polygon of this.polygons) {
      polygon.setClickable();
    }
  }
  unSetClickable() {
    for (const polygon of this.polygons) {
      polygon.unSetClickable();
    }
  }

  click() {
    for (const polygon of this.polygons) {
      google.maps.event.addListener(polygon, 'click', e => {
        const latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        this.map.myPanTo(latLng);
        this.map.setZoom(this.zoom);
        this.afficherMesEnfants();
        this.map.mapCompt.endroitChange(this.name);
        this.map.mapCompt.onendroitChange.emit(this.name);
      });
    }
  }

  rightclick() {
    for (const polygon of this.polygons) {
      google.maps.event.addListener(polygon, 'rightclick', e => {
        const latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
        this.map.myPanTo(latLng);
        this.map.setZoom(this.zoom);

        this.infowindow.setPosition(latLng);
        this.infowindow.open(this.map);
        this.map.mapCompt.endroitChange(this.name);
        this.map.mapCompt.onendroitChange.emit(this.name);
      });
    }
  }

  afficher() {
    this.visible = true;
    // this.marker.setVisible(true);
    this.cityCircle.setMap(this.map.CircleVisible ? this.map : null);
    for (const polygon of this.polygons) {
      polygon.setMap(this.map);
      google.maps.event.addListener(polygon, 'mouseover', e => {
        this.setClickable();
      });
      google.maps.event.addListener(polygon, 'mouseout', e => {
        this.unSetClickable();
      });
    }
  }
  afficherMesEnfants() {
    if (this.enfants.length !== 0) {
      this.cacher();
    }
    for (const enfant of this.enfants) {
      enfant.afficher();
    }
    if (this.parent) {
      this.parent.cacher();
      this.parent.cacherMesFrere(this);
    }
  }

  cacherMesFrere(enf) {
    for (const enfant of this.enfants) {
      if (enf !== enfant) {
        enfant.afficher();
        enfant.cacherMesEnfants(null);
      }
    }
  }
  cacherMesEnfants(enf) {
    for (const enfant of this.enfants) {
      if (enfant !== enf) {
        enfant.cacher();
      }
    }
  }

  init() {
    if (!this.enfants) {
      return;
    }
    for (const enfant of this.enfants) {
      enfant.cacher();
      enfant.init();
    }
  }
  cacher() {
    // this.marker.setVisible(false);
    this.cityCircle.setMap(null);
    this.visible = false;
    for (const polygon of this.polygons) {
      polygon.setMap(null);
    }
  }

  drawCircle(latLng) {
    this.cityCircle = new google.maps.Circle({
      strokeColor: '#000000',
      strokeOpacity: 0.5,
      strokeWeight: 0.5,
      fillColor: 'red',
      fillOpacity: this.properties.Shape_Area + 0.2,
      map: this.map,
      center: latLng,
      radius: 10000 * this.properties.Shape_Area + this.niveau * 1000
    });
  }
}

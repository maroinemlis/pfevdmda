import { Endroit } from './endroit';
import { MonPolygon } from './mon-polygon';
import {} from '@types/googlemaps';
import { MapComponent } from './map.component';

export class MonMap extends google.maps.Map {
  CircleVisible: Boolean = true;
  infowindow: any;
  firstZone: Endroit;
  endroits: Endroit[] = [];
  init = true;
  selectedEndroit: Endroit;
  mapCompt: MapComponent;
  constructor(id, options, features, mapCompt) {
    super(id, options);
    this.mapCompt = mapCompt;
    this.endroits = [];

    google.maps.event.addListener(this, 'zoom_changed', () => {
      if (this.getZoom() <= 6 && !this.firstZone.visible) {
        this.firstZone.init();
        this.firstZone.afficher();
      }
    });

    this.infowindow = new google.maps.InfoWindow();
    this.infowindow.setContent(this.mapCompt.div);
    this.fromFeatures(features);
    this.selectedEndroit = this.firstZone;
  }

  public toLatAndLngArray(latLngs) {
    const googlePolygon = [];
    for (const latLng of latLngs) {
      googlePolygon.push({ lat: latLng[1], lng: latLng[0] });
    }
    return googlePolygon;
  }
  public toLatAndLngArrayArray(coordinates) {
    const googleMultiPolygon = [];
    for (const coord of coordinates) {
      googleMultiPolygon.push(this.toLatAndLngArray(coord));
    }
    return googleMultiPolygon;
  }

  public fromFeatures(features, parent = null, niveau = 0) {
    if (features) {
      for (const feature of features) {
        const coordinates = feature.geometry.coordinates;
        let googlePolygon;
        const endroit = new Endroit(feature.properties, parent, niveau, this);
        for (const coordinate of coordinates) {
          const paths = this.toLatAndLngArrayArray(coordinate);
          const options = {
            paths: paths,
            strokeColor: '#000000',
            strokeOpacity: 0.8,
            strokeWeight: 0.8,
            fillColor: endroit.color,
            fillOpacity: 0.1
          };
          googlePolygon = new MonPolygon(options, endroit);
          endroit.polygons.push(googlePolygon);
        }
        if (parent == null) {
          this.firstZone = endroit;
          this.firstZone.afficher();
        } else {
          parent.enfants.push(endroit);
        }
        endroit.parent = parent;
        endroit.click();
        endroit.rightclick();

        this.fromFeatures(feature.features, endroit, niveau + 1);
      }
    }
  }

  public myPanTo(latLng) {
    // this.panTo(latLng);
    const latLng2 = {
      lat: this.getCenter().lat(),
      lng: this.getCenter().lng()
    };
    const time = 10;
    const delta = 0.001;
    if (latLng.lat > latLng2.lat) {
      while (latLng.lat > latLng2.lat) {
        latLng2.lat += delta;
        setTimeout(() => this.panTo(latLng2), time);
      }
    } else {
      while (latLng.lat < latLng2.lat) {
        latLng2.lat += -delta;
        setTimeout(() => this.panTo(latLng2), time);
      }
    }

    if (latLng.lng > latLng2.lng) {
      while (latLng.lng > latLng2.lng) {
        latLng2.lng += delta;
        setTimeout(() => this.panTo(latLng2), time);
      }
    } else {
      while (latLng.lng < latLng2.lng) {
        latLng2.lng += -delta;
        setTimeout(() => this.panTo(latLng2), time);
      }
    }
  }

  /*
  smoothZoom(targetZoom, currentZoom) {
    if (currentZoom == targetZoom) {
      return;
    } else {
      let z = google.maps.event.addListener(this, "zoom_changed", function(
        event
      ) {
        google.maps.event.removeListener(z);
        if (currentZoom < targetZoom)
          this.smoothZoom(targetZoom, currentZoom + 1);
        else this.smoothZoom(targetZoom, currentZoom - 1);
      });
      setTimeout(function() {
        this.setZoom(currentZoom);
      }, 0);
    }
  }*/

  setCircles(bool: boolean) {
    this.CircleVisible = bool;
  }
}

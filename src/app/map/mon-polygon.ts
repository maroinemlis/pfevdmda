import {} from '@types/googlemaps';
import { Endroit } from './endroit';
export class MonPolygon extends google.maps.Polygon {
  options: any;
  monEndroit: Endroit;
  constructor(options, monEndroit) {
    super(options);
    this.options = options;
    this.monEndroit = monEndroit;
  }

  setClickable() {
    this.options.fillOpacity = 0.5;

    this.setOptions(this.options);
  }
  unSetClickable() {
    this.options.fillOpacity = 0.1;
    this.setOptions(this.options);
  }

  toLatLng(paths) {
    const polygonCoords = [];
    paths.forEach(latLng => {
      polygonCoords.push(new google.maps.LatLng(latLng[1], latLng[0]));
    });
    return polygonCoords;
  }
  getCenter() {
    const bounds = new google.maps.LatLngBounds();
    const polygonCoords = this.toLatLng(this.options.paths);
    for (let i = 0; i < polygonCoords.length; i++) {
      bounds.extend(polygonCoords[i]);
    }
    return { lat: bounds.getCenter().lat(), lng: bounds.getCenter().lng() };
  }
}

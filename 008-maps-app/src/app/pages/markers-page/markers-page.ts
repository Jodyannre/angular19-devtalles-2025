import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import tt from '@tomtom-international/web-sdk-maps';
import { v4 as uuidv4 } from 'uuid';
import { JsonPipe } from '@angular/common';

const accessToken = environment.mapboxKey

interface Marker {
  id: string;
  ttMarker: tt.Marker;
  color: string;
}

@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
  templateUrl: './markers-page.html',
})
export class MarkersPage implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<tt.Map | null>(null);
  markers = signal<Marker[]>([]);


    async ngAfterViewInit() {
      if (!this.divElement()?.nativeElement) return;

      await new Promise((resolve) => setTimeout(resolve, 80));

      const element = this.divElement()!.nativeElement;

      const map = tt.map({
        key: environment.mapboxKey,
        container: element,
        center: {lat: 11, lng: 11},
        zoom: 5
      });

      map.addControl(new tt.FullscreenControl());

      // const marker = new tt.Marker({
      //   draggable: false,
      //   color: 'blue'
      // }).setLngLat({lng: 11, lat: 11}).addTo(map);

      // marker.on('dragend', () => {
      //   const lngLat = marker.getLngLat();
      //   console.log(lngLat);
      // });

      this.mapListeners(map)
    }

    mapListeners(map: tt.Map) {
      map.on('click', (event)=> this.mapClick(event));
      this.map.set(map);
    }

    mapClick(event: tt.MapMouseEvent<'click'>) {

      if (!this.map()) return;

      const color = '#xxxxxx'.replace(/x/g, (y) =>
        ((Math.random() * 16) | 0).toString(16)
      );
      const coords = event.lngLat;
      const ttMarker = new tt.Marker({
        draggable: false,
        color: color
      }).setLngLat(coords).addTo(this.map()!);

      const newMarker: Marker = {
        id: uuidv4(),
        ttMarker: ttMarker,
        color: color
      };

      this.markers.update( (markers) => [newMarker, ...markers]);

      console.log(this.markers());
    }

    flyToMarker( lngLat: tt.LngLat ) {
      if (!this.map()) return;

      this.map()!.setCenter( lngLat );
    }

    deleteMarker( marker: Marker ) {
      if (!this.map()) return;

      const map = this.map()!;

      marker.ttMarker.remove();

      this.markers.update( (markers) =>
        markers.filter( m => m.id !== marker.id )
      );
    }

}

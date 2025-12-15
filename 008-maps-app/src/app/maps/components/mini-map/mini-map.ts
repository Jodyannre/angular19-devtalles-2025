import { AfterViewInit, Component, ElementRef, input, signal, viewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import tt from '@tomtom-international/web-sdk-maps';
import { map } from 'rxjs';

/**
 * Width = 100%
 * Height = 260px
 */


@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.html',
  styles: [`
    #map {
      width: 100%;
      height: 260px;
    }
  `],
})
export class MiniMap implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<tt.Map | null>(null);
  coordinates = input<{ lng: number; lat: number }>({ lng: 0, lat: 0 });
  zoom = input<number>(14);

  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 80));

    const element = this.divElement()!.nativeElement;
    const {lat, lng} = this.coordinates();
    const map = tt.map({
      key: environment.mapboxKey,
      container: element,
      zoom: this.zoom(),
      center: [ lng, lat ],
      interactive: false,
      pitch: 30,
    });

    map.addControl(new tt.FullscreenControl());
    this.map.set(map);
    this.addMarker({ lng, lat });
  }

  addMarker(coordinates: { lng: number; lat: number }, color: string = 'blue') {
    new tt.Marker({
      draggable: false,
      color: color
    }).setLngLat(coordinates).addTo(this.map()!);
  }

 }

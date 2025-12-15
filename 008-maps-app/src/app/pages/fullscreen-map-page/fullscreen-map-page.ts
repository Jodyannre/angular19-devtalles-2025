import { Component, OnInit, viewChild, ViewEncapsulation, ElementRef, AfterViewInit, signal, effect } from '@angular/core';
import tt from '@tomtom-international/web-sdk-maps';
import { environment } from '../../../environments/environment.development';
import { map } from 'rxjs';
import { DecimalPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [DecimalPipe, JsonPipe],
  templateUrl: './fullscreen-map-page.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    #controls {
      background-color: white;
      padding: 10px;
      border-radius: 5px;
      position: fixed;
      bottom: 25px;
      right: 20px;
      z-index: 9999;
      box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
      border: 1px solid #e2e8f0;
      width: 250px;
    }
  `]
})
export class FullscreenMapPage implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<tt.Map | null>(null);
  zoom = signal(1);
  coordinates = signal({
    lng: -74.5,
    lat: 40,
  })

  zoomEffect = effect(() => {
    if (!this.map() ) return;
    this.map()!.setZoom(this.zoom());
    //this.map()!.zoomTo(this.zoom(), { duration: 1000 });
  });
  // ngOnInit(): void {
  //   const map = tt.map({
  //     key: environment.mapboxKey,
  //     container: 'map',
  //   });

  //   map.addControl(new tt.FullscreenControl());
  // }

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
    });

    map.addControl(new tt.FullscreenControl());

    this.mapListeners(map);
  }

  mapListeners( map: tt.Map ) {
    map.on('zoom', () => {
      const newZoom = map.getZoom();
      this.zoom.set( newZoom );
    });

    map.on('move', () => {
      const center = map.getCenter();
      this.coordinates.set(center);
    });

    map.on('load', () => {
      console.log('Map loaded');
    });

    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());
    map.addControl(new tt.ScaleControl());

    this.map.set(map);
  }



}

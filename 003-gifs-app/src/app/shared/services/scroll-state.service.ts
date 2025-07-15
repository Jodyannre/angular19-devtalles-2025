import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollStateService {

  scrollState = signal<number>(0);


}

import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';



@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
})

export default class TrendingPageComponent implements AfterViewInit{

  giftService = inject(GifService);
  scrollStateService = inject(ScrollStateService);
  groupDivRef = viewChild<ElementRef>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv = this.groupDivRef()?.nativeElement;
    if (!scrollDiv) return;
    scrollDiv.scrollTop = this.scrollStateService.scrollState();
  }

  onScroll(event: Event) {
    const scrollDiv = this.groupDivRef()?.nativeElement;

    if (!scrollDiv) return;

    const { scrollTop, clientHeight, scrollHeight } = scrollDiv;

    const isAtBottom = scrollTop + clientHeight + 300 > scrollHeight;
    this.scrollStateService.scrollState.set(scrollTop);

    if (isAtBottom) this.giftService.loadTrendingGifs();


  }
}

import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GiftListComponent } from "../../components/gift-list/gift-list.component";
import { GifService } from '../../services/gifs.service';



@Component({
  selector: 'app-trending-page',
  //imports: [GiftListComponent],
  templateUrl: './trending-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export default class TrendingPageComponent {

  giftService = inject(GifService);
  groupDivRef = viewChild<ElementRef>('groupDiv');

  onScroll(event: Event) {
    const scrollDiv = this.groupDivRef()?.nativeElement;
  }
}

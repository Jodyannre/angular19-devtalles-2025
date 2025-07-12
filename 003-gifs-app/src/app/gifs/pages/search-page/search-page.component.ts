import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GiftListComponent } from "../../components/gift-list/gift-list.component";
import { GifService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gift.interface';

@Component({
  selector: 'app-search-page',
  imports: [GiftListComponent],
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent {

  gifService = inject(GifService);
  gifs = signal<Gif[]>([]);

  onSearch(query: string) {
    this.gifService.searchGifs(query).subscribe( gifs => {
      this.gifs.set(gifs);
    });
  }
}

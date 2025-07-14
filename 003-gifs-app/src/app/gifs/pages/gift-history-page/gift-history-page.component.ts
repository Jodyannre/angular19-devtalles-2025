import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifService } from '../../services/gifs.service';
import { GiftListComponent } from "../../components/gift-list/gift-list.component";

@Component({
  selector: 'app-gift-history-page',
  imports: [GiftListComponent],
  templateUrl: './gift-history-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GiftHistoryPageComponent {

  gifService = inject(GifService)

  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map( (params) => params['query'])
    )
  );

  gifsByKey = computed( () => this.gifService.getHistoryGifs(this.query()))
 }

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  selector: 'app-gift-history-page',
  imports: [],
  templateUrl: './gift-history-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GiftHistoryPageComponent {

  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map( (params) => params['query'])
    )
  );
 }

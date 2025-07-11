import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GiftListItemComponent } from "./gift-list-item/gift-list-item.component";
import { Gif } from '../../interfaces/gift.interface';

@Component({
  selector: 'gift-list',
  imports: [GiftListItemComponent],
  templateUrl: './gift-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiftListComponent {
  imageUrls = input.required<Gif[]>();
 }

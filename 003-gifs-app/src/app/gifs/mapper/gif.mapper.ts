import { Gif } from "../interfaces/gift.interface";
import { GiphyItem } from "../interfaces/giphy.interfaces";

export class GifMapper {

  static mapGiphyItemToGif(item: GiphyItem): Gif {
    return {
      id: item.id,
      title: item.title,
      imageUrl: item.images.original.url
    };
  }

  static mapGiphyItemsToGifs(items: GiphyItem[]): Gif[] {
    return items.map(this.mapGiphyItemToGif);
  }

}

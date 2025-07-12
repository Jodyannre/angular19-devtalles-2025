import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gift.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);

  trendingGifsLoading = signal<boolean>(true);

  gifsSearched = signal<Gif[]>([]);

  searchHistory = signal<Record<string, Gif[]>>({});
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    const apiKey = environment.giphyApiKey;

    this.http.get<GiphyResponse>(`${ environment.giphyApiUrl }/gifs/trending`, {
      params: {
        api_key: apiKey,
        limit: 20,
      }
    }).subscribe( res => {
      const gifs = GifMapper.mapGiphyItemsToGifs(res.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
    })
  }

  searchGifs(query: string) {
    const apiKey = environment.giphyApiKey;

    return this.http.get<GiphyResponse>(`${ environment.giphyApiUrl }/gifs/search`, {
      params: {
        api_key: apiKey,
        q: query,
        limit: 20,
      }
  }).pipe(
    map( ({data}) => data),
    map( items => GifMapper.mapGiphyItemsToGifs(items)),
    tap( (items) => {
      this.searchHistory.update( prev => ({
        ...prev,
        [query]: items
      }))
    })
  )

  }

}

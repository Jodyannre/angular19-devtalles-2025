import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gift.interface';
import { GifMapper } from '../mapper/gif.mapper';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);

  trendingGifsLoading = signal<boolean>(true);

  gifsSearched = signal<Gif[]>([]);

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

    this.http.get<GiphyResponse>(`${ environment.giphyApiUrl }/gifs/search`, {
      params: {
        api_key: apiKey,
        q: query,
        limit: 20,
      }
  }).subscribe(res => {
      const gifs = GifMapper.mapGiphyItemsToGifs(res.data);
      this.gifsSearched.set(gifs);
      console.log('Gifs searched:', this.gifsSearched());
    });
  }

}

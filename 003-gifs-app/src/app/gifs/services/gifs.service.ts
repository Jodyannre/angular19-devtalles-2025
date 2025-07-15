import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gift.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

const GIF_KEY = 'gifs';


const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
  const gifs = JSON.parse(gifsFromLocalStorage);
  return gifs;
}


@Injectable({
  providedIn: 'root'
})

export class GifService {

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);

  trendingGifGroup = computed<Gif[][]>( () => {
    const group = [];
    for (let i = 0; i< this.trendingGifs().length; i+=3) {
      group.push(this.trendingGifs().slice(i, i+3))
    }
    return group;
  })

  trendingGifsLoading = signal<boolean>(false);
  trendingGifsPage = signal<number>(0);

  gifsSearched = signal<Gif[]>([]);

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  saveGifsToLocalStorage = effect( () => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY, historyString);
  })

  loadTrendingGifs() {

    if (this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true);

    const apiKey = environment.giphyApiKey;

    this.http.get<GiphyResponse>(`${ environment.giphyApiUrl }/gifs/trending`, {
      params: {
        api_key: apiKey,
        limit: 20,
        offset: this.trendingGifsPage() * 20,
      }
    }).subscribe( res => {
      const gifs = GifMapper.mapGiphyItemsToGifs(res.data);
      this.trendingGifs.update( prev => [...prev, ...gifs]);
      this.trendingGifsLoading.set(false);
      this.trendingGifsPage.set(this.trendingGifsPage() + 1);
    })
  }

  searchGifs(query: string): Observable<Gif[]> {
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

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] || [];
  }

}

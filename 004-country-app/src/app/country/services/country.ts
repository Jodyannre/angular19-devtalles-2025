import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import type { Country } from '../interfaces/country.interface';
import { catchError, count, delay, map, Observable, throwError, of, tap } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../interfaces/region.type';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();



  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map( res => CountryMapper.mapRestCountryArrayToCountryArray(res)),
      tap( capitals => this.queryCacheCapital.set( query, capitals )),
      catchError( err => {
        return throwError(
          () => new Error(`No se encontraron resultados con el query: ${query}`)
        )
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map( res => CountryMapper.mapRestCountryArrayToCountryArray(res)),
      tap( countries => this.queryCacheCountry.set( query, countries )),
      delay(2000),
      catchError( err => {
        return throwError(
          () => new Error(`No se encontraron resultados con el query: ${query}`)
        )
      })
    );
  }


  searchByRegion(region: Region) {

    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`)
    .pipe(
      map( res => CountryMapper.mapRestCountryArrayToCountryArray(res)),
      tap( regions => this.queryCacheRegion.set( region, regions )),
      catchError( err => {
        return throwError(
          () => new Error(`No se encontraron resultados con el query: ${region}`)
        )
      })
    );
  }


  searchByAlphaCode(code: string): Observable<Country[]> {
    const url = `${API_URL}/alpha/${code}`;
    code = code.toUpperCase();

    return this.http.get<RESTCountry[]>(url)
    .pipe(
      map( res => CountryMapper.mapRestCountryArrayToCountryArray(res)),
      map( countries => countries.at(0) ? [countries.at(0)!] : [] ),
      catchError( err => {
        return throwError(
          () => new Error(`No se pudo encontrar un país con el código: ${code}`)
        )
      })
    );
  }

}

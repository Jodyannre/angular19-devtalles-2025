import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interfaces';
import type { Country } from '../interfaces/country.interface';
import { catchError, count, delay, map, Observable, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);


  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`)
    .pipe(
      map( res => CountryMapper.mapRestCountryArrayToCountryArray(res)),
      catchError( err => {
        return throwError(
          () => new Error(`No se encontraron resultados con el query: ${query}`)
        )
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`)
    .pipe(
      map( res => CountryMapper.mapRestCountryArrayToCountryArray(res)),
      delay(2000),
      catchError( err => {
        return throwError(
          () => new Error(`No se encontraron resultados con el query: ${query}`)
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

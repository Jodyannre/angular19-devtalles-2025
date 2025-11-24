import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { SearchInput } from '../../components/search-input/search-input';
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {
  countryService = inject(CountryService);
  activeRoute = inject(ActivatedRoute);
  router = inject(Router)

  queryParams = this.activeRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(() =>this.queryParams);

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of<[]>([]);
      this.router.navigate(['/country/by-capital'], {
        queryParams: { query: params.query },
      });
      return this.countryService.searchByCapital(params.query);
    }
  });

 /*  countryResource = resource({
    params: () => ({ query: this.query() }),
    loader: async ({ params }) => {
      if (!params.query) return [];
      return await firstValueFrom(
        this.countryService.searchByCapital(params.query)
      )
    }
  }) */

/*   isLoading = signal(false)
  isError = signal<string|null>(null)
  countries = signal<Country[]>([])

  onSearch(query: string) {
    this.isLoading.set(true);
    this.isError.set(null);
    this.countryService.searchByCapital(query)
    .subscribe({
      next: (countries) => {
        this.countries.set(countries);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.isError.set(err);
        this.countries.set([]);
      }
    });
  } */
}

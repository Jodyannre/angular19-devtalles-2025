import { Component, inject, resource, signal } from '@angular/core';
import { SearchInput } from '../../components/search-input/search-input';
import { CountryList } from "../../components/country-list/country-list";
import { CountryService } from '../../services/country';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'by-capital-page',
  imports: [SearchInput, CountryList],
  templateUrl: './by-capital-page.html',
})
export class ByCapitalPage {
  countryService = inject(CountryService);
  query = signal('');

  countryResource = resource({
    params: () => ({ query: this.query() }),
    loader: async ({ params }) => {
      if (!params.query) return [];
      return await firstValueFrom(
        this.countryService.searchByCapital(params.query)
      )
    }
  })

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

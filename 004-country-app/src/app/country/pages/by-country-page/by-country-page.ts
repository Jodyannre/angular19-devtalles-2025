import { Component, inject, resource, signal } from '@angular/core';
import { CountryList } from "../../components/country-list/country-list";
import { SearchInput } from "../../components/search-input/search-input";
import { CountryService } from '../../services/country';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'by-country-page',
  imports: [CountryList, SearchInput],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {
  CountryService = inject(CountryService);
  query = signal('');

  countryResource = resource({
    params: () => ({ query: this.query()}),
    loader: async ({ params}) => {
      if (!params.query) return [];
      return await firstValueFrom(
        this.CountryService.searchByCountry(params.query)
      )
    }
  })
}

import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { CountryList } from "../../components/country-list/country-list";
import { SearchInput } from "../../components/search-input/search-input";
import { CountryService } from '../../services/country';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'by-country-page',
  imports: [CountryList, SearchInput],
  templateUrl: './by-country-page.html',
})
export class ByCountryPage {
  CountryService = inject(CountryService);
  activeRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParams = this.activeRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(() => this.queryParams);

  /* Todas las formas de hacerlo esta en by-capital-page.ts */

  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of<[]>([]);
      this.router.navigate(['/country/by-country'], {
        queryParams: { query: params.query },
      });
      return this.CountryService.searchByCountry(params.query);
    }
  })
}

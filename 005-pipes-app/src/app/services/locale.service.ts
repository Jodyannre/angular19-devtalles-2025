import { Injectable, signal } from '@angular/core';

export type availableLocales = 'es' | 'fr' | 'en';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  private currentLocale = signal<availableLocales>('es');

  construtcor() {
    this.currentLocale.set(
      (localStorage.getItem('locale') as availableLocales) ?? 'es'
    )
  }

  get getLocale(): string {
    return this.currentLocale();
  }

  changeLocale(locale: availableLocales) {
    localStorage.setItem('locale', locale);
    this.currentLocale.set(locale);
    window.location.reload();
  }

}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CountryService} from '../country.service';
import {MatCardImage} from '@angular/material/card';
import {NgIf, NgOptimizedImage, Location, NgForOf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {forkJoin, map} from 'rxjs';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  imports: [
    MatCardImage,
    NgOptimizedImage,
    NgIf,
    MatButton,
    MatIcon,
    NgForOf
  ],
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {
  selectedCountry = '';
  selectedCountryDetails: any;
  borderCountries: any[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private countryService: CountryService,
              private location: Location) {}

  ngOnInit() {
    window.scrollTo(0, 0);
    this.route.params.subscribe(params => {
      this.selectedCountry = params['countryName'];
      this.getSelectedCountryDetails();
    });
  }

  /**
   * Fetches the selected country details from the server
   **/
  private getSelectedCountryDetails() {
    this.countryService.filterByName(this.selectedCountry, true)
      .pipe(map(data => {
        return {
          ...data[0],
          languages: this.getFormattedLanguages(data[0]),
          currencies: this.getFormattedCurrencies(data[0])
        }
      }))
      .subscribe(data => {
        this.selectedCountryDetails = data;
        if (this.selectedCountryDetails?.borders) {
          this.getBorderCountries(this.selectedCountryDetails?.borders);
        }
      });
  }

  /**
   * Fetches the border countries for the selected country from the server
   **/
  public getBorderCountries(borderCountryCodes: string[]) {
    const getByCountryCodeApiUrls = borderCountryCodes.map(code => {
      return this.countryService.filterByCode(code).pipe(map(data => data[0]?.name?.common))
    });
    forkJoin(getByCountryCodeApiUrls).subscribe(borderCountries => {
      this.borderCountries = borderCountries;
    });
  }

  /**
   * Gets called on country card click
   **/
  public viewCountryDetails(selectedCountry: string) {
    this.router.navigate([`details/${selectedCountry}`], { relativeTo: this.route.parent }).then();
  }

  /**
   * Formats the language data in a formatted string for the selected country
   **/
  private getFormattedLanguages(selectedCountry: any): string {
    return selectedCountry?.languages? Object.values(selectedCountry.languages).join(', ') : ''
  }

  /**
   * Formats the currency data in a formatted string for the selected country
   **/
  private getFormattedCurrencies(selectedCountry: any): string {
    if (selectedCountry.currencies) {
      const currencyValues = Object.values(selectedCountry.currencies);
      const currencies = currencyValues.map((currency: any) => { return currency.name; });
      return currencies.join(', ');
    }
    return '';
  }

  /**
   * Gets called on the back button click event
   **/
  public onBackButtonClick() {
    this.location.back();
  }
}

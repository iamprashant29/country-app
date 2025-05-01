import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
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
              private countryService: CountryService,
              private location: Location) {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
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
      .subscribe(data => {
        this.selectedCountryDetails = data;
        if (this.selectedCountryDetails[0]?.borders) {
          this.getBorderCountries(this.selectedCountryDetails[0]?.borders);
        }
        console.log(this.selectedCountryDetails);
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
   * Gets called on the back button click event
   **/
  public onBackButtonClick() {
    this.location.back();
  }
}

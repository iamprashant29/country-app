import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CountryService} from '../country.service';
import {MatCardImage} from '@angular/material/card';
import {NgIf, NgOptimizedImage, Location} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  imports: [
    MatCardImage,
    NgOptimizedImage,
    NgIf,
    MatButton,
    MatIcon
  ],
  styleUrls: ['./country-details.component.scss']
})
export class CountryDetailsComponent implements OnInit {
  public selectedCountry = '';
  public selectedCountryDetails: any;

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

  private getSelectedCountryDetails() {
    this.countryService.filterByName(this.selectedCountry, true)
      .subscribe(data => {
        this.selectedCountryDetails = data;
        console.log(this.selectedCountryDetails);
      });
  }

  public onBackButtonClick() {
    this.location.back();
  }
}

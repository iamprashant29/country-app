import {Component, OnInit} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {CountryService} from '../country.service';
import {FormControl, FormGroup} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrl: 'country-list.component.scss',
  imports: [SharedModule, MatInput, MatCard, MatCardContent, MatCardImage, NgOptimizedImage],
})
export class CountryListComponent implements OnInit {
  countriesList: any[] = [];
  searchForm!: FormGroup;

  constructor(private countryService: CountryService) {}

  /**
   * ngOnInit
   **/
  ngOnInit() {
    this.initializeForm();
    this.getCountriesList();
  }

  /**
   * Initializes form
   **/
  private initializeForm() {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl('')
    });
  }

  /**
   * Fetches the country list from the server
   **/
  private getCountriesList() {
    this.countryService.getCountries().subscribe((response) => {
      this.countriesList = response.sort((a: any, b: any) => {
        if (a?.name?.common < b?.name?.common)
          return -1;
        if (a?.name?.common > b?.name?.common)
          return 1;
        return 0;
      });
      console.log(this.countriesList);
    });
  }
}

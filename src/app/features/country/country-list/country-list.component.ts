import {Component, OnInit} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {CountryService} from "../country.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrl: 'country-list.component.scss',
  imports: [SharedModule],
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
      this.countriesList = response;
      console.log(this.countriesList);
    });
  }
}

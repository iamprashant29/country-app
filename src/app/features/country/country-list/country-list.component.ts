import {AfterViewInit, Component, DestroyRef, Inject, OnInit} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {CountryService} from '../country.service';
import {FormControl, FormGroup} from '@angular/forms';
import {MatFormField, MatInputModule} from '@angular/material/input';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';
import {NgOptimizedImage} from '@angular/common';
import {MatIcon} from "@angular/material/icon";
import {catchError, debounceTime, distinctUntilChanged, of, switchMap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrl: 'country-list.component.scss',
  imports: [SharedModule, MatInputModule, MatCard, MatCardContent, MatCardImage, NgOptimizedImage, MatFormField, MatIcon],
})
export class CountryListComponent implements OnInit, AfterViewInit {
  countriesList: any[] = [];

  searchForm!: FormGroup;

  constructor(@Inject(DestroyRef) private destroyRef: DestroyRef,
              private countryService: CountryService) {}

  /**
   * ngOnInit
   **/
  ngOnInit() {
    this.initializeForm();
    this.getCountriesList();
  }

  /**
   * ngAfterViewInit
   **/
  // TODO: Handle 404 error in interceptor
  ngAfterViewInit() {
    this.searchForm.get('searchTerm')?.valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
        switchMap((searchTerm: string) => {
          return searchTerm? this.countryService.filterByName(searchTerm) : this.countryService.getCountries()
        }),
        catchError(() => of([]))
    ).subscribe(filteredCountries => {
      this.countriesList = this.sortData(filteredCountries);
    });
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
      this.countriesList = this.sortData(response);
      console.log(this.countriesList);
    });
  }

  private sortData(data: any) {
    return data?.sort((a: any, b: any) => {
      if (a?.name?.common < b?.name?.common)
        return -1;
      if (a?.name?.common > b?.name?.common)
        return 1;
      return 0;
    });
  }
}

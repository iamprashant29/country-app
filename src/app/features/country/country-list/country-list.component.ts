import {AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, DestroyRef, Inject, OnInit} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {CountryService} from '../country.service';
import {FormControl, FormGroup} from '@angular/forms';
import {MatFormField, MatInputModule} from '@angular/material/input';
import {MatCard, MatCardContent, MatCardImage} from '@angular/material/card';
import {NgOptimizedImage} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {catchError, debounceTime, distinctUntilChanged, map, of, switchMap, tap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatOption, MatSelect} from '@angular/material/select';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {ErrorService} from '../../../shared/error.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrl: 'country-list.component.scss',
  imports: [SharedModule, MatInputModule, MatCard, MatCardContent, MatCardImage, NgOptimizedImage, MatFormField, MatIcon, MatSelect, MatOption, RouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CountryListComponent implements OnInit, AfterViewInit {
  countriesList: any[] = [];

  searchForm!: FormGroup;

  availableRegions = ['All'];

  constructor(@Inject(DestroyRef) private destroyRef: DestroyRef,
              private countryService: CountryService,
              private errorService: ErrorService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  /**
   * ngOnInit
   **/
  ngOnInit() {
    window.scrollTo(0, 0);
    this.errorService.getCountryNotFoundApiError().subscribe(
      (data) => {
        if (data) {
          this.handleNoResultsFoundError();
        }
      }
    );
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
        map(filteredCountries => {
          return this.sortData(filteredCountries);
        }),
        catchError(() => of([]))
    ).subscribe(response => {
      this.countriesList = response;
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
    this.countryService.getCountries().pipe(
      tap(countries => {
        this.populateRegions(countries);
      }),
      map(countries => {
        return this.sortData(countries);
      })
    )
      .subscribe((response) => {
      this.countriesList = response;
    });
  }

  /**
   * Sort countries alphabetically based on the 'name' attribute
   **/
  private sortData(data: any) {
    return data?.sort((a: any, b: any) => {
      if (a?.name?.common < b?.name?.common)
        return -1;
      if (a?.name?.common > b?.name?.common)
        return 1;
      return 0;
    });
  }

  /**
   * Initializes the available regions to be used in the filter dropdown
   **/
  private populateRegions(data: any) {
    const regions: any[] = [];
    data.forEach((country: any) => {
      if (!regions.includes(country.region)) {
        regions.push(country.region);
      }
    });
    regions.sort();
    this.availableRegions = [...this.availableRegions, ...regions];
  }

  /**
   * Gets called on selected region change
   **/
  public onSelectRegion(event: any) {
    this.countryService.filterByRegion(event.value).pipe(
      map((data) => {
        return this.sortData(data);
      })
    )
      .subscribe((data) => {
        this.countriesList = data;
      });
  }

  /**
   * Gets called on country card click
   **/
  public viewCountryDetails(selectedCountry: string) {
    this.router.navigate([`details/${selectedCountry}`], {relativeTo: this.route}).then();
  }

  /**
   * Shows toaster on country not found API error and reload the page
   **/
  private handleNoResultsFoundError() {
    this.snackBar.open('No results found for this search text. Please try again.', 'OK', {duration: 3000});
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
}

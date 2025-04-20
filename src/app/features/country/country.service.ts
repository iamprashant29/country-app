import {Injectable} from '@angular/core';
import {BaseService} from '../../../base.service';
import {Observable} from 'rxjs';
import {ApiConstants} from '../../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends BaseService {
  constructor() {
    super();
  }

  /**
   * Gets all countries
   * @returns Observable<any>
   **/
  getCountries(): Observable<any> {
    const apiUrl = ApiConstants.constants.GET_ALL_COUNTRIES;
    return this.httpClient?.get<any>(apiUrl);
  }

  /**
   * Fetches countries by name filtered by search term
   * @param searchTerm
   * @returns Observable<any>
   **/
  searchCountriesByName(searchTerm: string): Observable<any> {
    const apiUrl = `${ApiConstants.constants.SEARCH_BY_COUNTRY_NAME}/${searchTerm}`;
    return this.httpClient?.get<any>(apiUrl);
  }
}

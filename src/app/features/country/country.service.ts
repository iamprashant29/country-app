import {Injectable} from '@angular/core';
import {BaseService} from '../../../base.service';
import {Observable} from 'rxjs';
import {ApiConstants} from '../../constants/api.constants';
import { HttpParams } from '@angular/common/http';


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
   * Fetches countries by name filtered by search term or full name
   * @param searchTerm
   * @param isFullNameFilter
   * @returns Observable<any>
   **/
  filterByName(searchTerm: string, isFullNameFilter?: boolean): Observable<any> {
    let params;
    const apiUrl = `${ApiConstants.constants.SEARCH_BY_COUNTRY_NAME}/${searchTerm}`;
    if (isFullNameFilter) {
      params = new HttpParams().set('fullText', true);
      return this.httpClient?.get<any>(apiUrl, { params });
    }
    return this.httpClient?.get<any>(apiUrl);
  }

  /**
   * Fetches countries by selected region
   * @param region
   * @returns Observable<any>
   **/
  filterByRegion(region: string): Observable<any> {
    if (region === 'All') {
      return this.getCountries();
    }
    const apiUrl = `${ApiConstants.constants.FILTER_BY_REGION}/${region}`;
    return this.httpClient?.get<any>(apiUrl);
  }

  /**
   * Fetches country by provided country code
   * @param code
   * @returns Observable<any>
   **/
  filterByCode(code: string): Observable<any> {
    const apiUrl = `${ApiConstants.constants.FILTER_BY_CODE}/${code}`;
    return this.httpClient?.get<any>(apiUrl);
  }
}

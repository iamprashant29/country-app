import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private countryNotFoundApiError$ = new BehaviorSubject<boolean>(false);

  setCountryNotFoundApiError() {
    this.countryNotFoundApiError$.next(true);
  }

  getCountryNotFoundApiError(): BehaviorSubject<boolean> {
    return this.countryNotFoundApiError$;
  }
}

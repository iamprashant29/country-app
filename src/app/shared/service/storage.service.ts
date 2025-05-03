import {Injectable} from '@angular/core';
import {ThemeType} from '../model/theme.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public setActiveMode(activeMode: ThemeType) {
    window.localStorage.setItem('mode', activeMode);
  }

  public getActiveMode() {
    return window.localStorage.getItem('mode');
  }
}

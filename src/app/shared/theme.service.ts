import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ThemeType} from './theme.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  public isDarkMode = new BehaviorSubject(false);

  activeMode = ThemeType.Light;

  constructor() {
    document.body.classList.add(ThemeType.Light);
    document.body.classList.add(ThemeType.Dark);
  }

  /**
   * Sets the selected mode as active
   **/
  setActiveMode(mode: ThemeType) {
    this.activeMode = mode;
    if (mode === ThemeType.Dark) {
      document.body.classList.replace(ThemeType.Light, ThemeType.Dark);
    } else {
      document.body.classList.replace(ThemeType.Dark, ThemeType.Light);
    }
    this.isDarkMode.next(mode === ThemeType.Dark);
  }

  /**
   * Returns the active mode
   **/
  getActiveMode() {
    return this.activeMode;
  }
}

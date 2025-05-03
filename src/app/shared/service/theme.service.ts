import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ThemeType} from '../model/theme.model';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;

  public isDarkMode = new BehaviorSubject(false);

  activeMode = ThemeType.Light;

  constructor(private rendererFactory: RendererFactory2, private storageService: StorageService) {
    this.renderer = this.rendererFactory.createRenderer(null, null)
  }

  /**
   * Sets the selected mode as active
   **/
  setActiveMode(mode: ThemeType) {
    this.activeMode = mode;
    if (mode === ThemeType.Dark) {
      this.renderer.removeClass(document.body, ThemeType.Light);
      this.renderer.addClass(document.body, ThemeType.Dark);
    } else {
      this.renderer.removeClass(document.body, ThemeType.Dark);
      this.renderer.addClass(document.body, ThemeType.Light);
    }
    this.storageService.setActiveMode(this.activeMode);
    this.isDarkMode.next(mode === ThemeType.Dark);
  }

  /**
   * Returns the active mode
   **/
  getActiveMode() {
    return this.activeMode;
  }
}

import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {Observable} from 'rxjs';
import {ThemeService} from './shared/theme.service';
import {ThemeType} from './shared/theme.model';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIcon, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public $isDarkMode: Observable<boolean>;

  constructor(private themeService: ThemeService) {
    this.$isDarkMode = this.themeService.isDarkMode.asObservable();
  }

  /**
   * ngOnInit
   **/
  ngOnInit() {
    this.themeService.setActiveMode(ThemeType.Light);
  }

  /**
   * toggle theme i.e. light/dark mode
   **/
  toggleTheme() {
    if (this.themeService.getActiveMode() === ThemeType.Light) {
      this.themeService.setActiveMode(ThemeType.Dark);
    } else {
      this.themeService.setActiveMode(ThemeType.Light);
    }
  }
}

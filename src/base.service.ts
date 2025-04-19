import { HttpClient } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';

@Injectable()
export class BaseService {
  protected httpClient!: HttpClient;

  constructor() {
    this.httpClient = inject(HttpClient);
  }
}

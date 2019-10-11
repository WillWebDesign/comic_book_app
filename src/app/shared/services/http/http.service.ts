import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}
  url = environment.url;

  private getApiUrl(complement: any) {
    if (typeof complement === 'undefined') {
      complement = '';
    }
    return `${this.url}/${complement}`;
  }

  private serialize(obj: any) {
    const str = [];
    for (const p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(
          `${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`,
        );
      }
    }
    return str.join('&');
  }

  get(path: any, data = null) {
    if (data !== null) {
      data.api_key = environment.apiKey;
      path = `${path}?${this.serialize(data)}`;
    }
    return this.http.get(this.getApiUrl(path));
  }
}

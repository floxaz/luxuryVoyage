import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private languageInUse = 'it';
  private langData: any;
  private langDataSupply: Observable<any>;

  constructor(private http: HttpClient) {}

  changeLanguage(language: string) {
    this.languageInUse = language;
    this.getJSON();
  }

  getJSON() {
    this.langDataSupply = this.http.get(`./assets/lang/${this.languageInUse}.json`);
    this.langDataSupply
    .subscribe(data => {
      this.langData = data;
      console.log(this.langData);
    });
  }

  translate(text: string) {
    if (!this.langData) {
      return this.langDataSupply.pipe(map(data => {
        this.langData = data;
        console.log(this.langData);
        return this.langData[text];
      }));
    }

    return new Observable(observer => {
      observer.next(this.langData);
    });
    // console.log(this.langData);
    // return this.langData[text];
  }
}

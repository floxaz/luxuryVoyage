import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

interface Lang {
  lang: string;
}

@Injectable({
  providedIn: 'root'
})
export class LangService {
  userLang = new Subject<any>();
  constructor(private http: HttpClient, private authService: AuthService, private translate: TranslateService) { }

  saveUserLang() {
    console.log(this.translate.defaultLang);
    let lang: string;
    if (this.translate.currentLang) {
      lang = this.translate.currentLang;
    } else {
      lang = this.translate.defaultLang;
    }
    this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http.put(`https://luxuryvoyage1-9d7d0.firebaseio.com/lang/${user.id}.json?auth=${user.getToken()}`, { lang });
    }))
    .subscribe();
  }

  getLang() {
    this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http.get<Lang>(`https://luxuryvoyage1-9d7d0.firebaseio.com/lang/${user.id}.json?auth=${user.getToken()}`);
    }))
    .pipe(map(response => {
      return response.lang;
    }))
    .subscribe(lang => {
      if (lang) {
        this.userLang.next(lang);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isHome: boolean;
  year = new Date().getFullYear();
  language = 'it';

  constructor(private translate: TranslateService, private router: Router) { }

  ngOnInit() {
    if (this.translate.currentLang) {
      this.language = this.translate.currentLang;
    } else {
      this.language = this.translate.getDefaultLang();
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url !== '/') {
          this.isHome = false;
        } else {
          this.isHome = true;
        }
      }
    });
  }

  changeLanguage() {
    this.language = this.language === 'it' ? 'en' : 'it';
    this.translate.use(this.language);
  }
}

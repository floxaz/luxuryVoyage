import { Component, OnInit } from '@angular/core';
import { TranslationService } from '../shared/translation.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  year = new Date().getFullYear();
  language = 'it';

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.language = this.translate.getDefaultLang();
  }

  changeLanguage() {
    this.language = this.language === 'it' ? 'en' : 'it';
    this.translate.use(this.language);
  }
}

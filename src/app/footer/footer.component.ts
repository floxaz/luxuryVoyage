import { Component } from '@angular/core';
import { TranslationService } from '../shared/translation.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  year = new Date().getFullYear();
  language = 'it';

  constructor(private translationService: TranslationService) {}

  changeLanguage() {
    this.language = this.language === 'it' ? 'en' : 'it';
    this.translationService.changeLanguage(this.language);
  }
}

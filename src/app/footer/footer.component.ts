import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  year = new Date().getFullYear();
  language = 'it';

  changeLanguage() {
    this.language = this.language === 'it' ? 'en' : 'it';
  }
}

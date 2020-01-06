import { PipeTransform, Pipe } from '@angular/core';
import { TranslationService } from './translation.service';

@Pipe({
  name: 'translate',
  pure: true
})
export class TranslatePipe implements PipeTransform {
  constructor(private translationService: TranslationService) { }

  transform(value: string) {
    return this.translationService.translate(value);
  }
}

import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class LanguageValidationPipe implements PipeTransform {
  transform(value: any) {

    //TODO 
    
  
    const SUPPORTED_LANGUAGES = ['en', 'es', 'fr', 'de', 'it']; // Define supported languages

    if (!SUPPORTED_LANGUAGES.includes(value)) {
      throw new BadRequestException(`${value} not a supported language.`);
    }

    return value;
  }
}

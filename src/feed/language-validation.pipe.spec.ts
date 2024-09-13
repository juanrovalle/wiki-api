import { LanguageValidationPipe } from './language-validation.pipe';
import { BadRequestException } from '@nestjs/common';

describe('LanguageValidationPipe', () => {
  let pipe: LanguageValidationPipe;

  beforeEach(() => {
    // Mock the environment variable as an array of supported languages
    process.env.LIBRETRANSLATE_SUPPORTED_LANGUAGES = 'en,es,fr,de,it';
    pipe = new LanguageValidationPipe();
  });

  it('should allow supported language "en"', () => {
    expect(pipe.transform('en')).toBe('en');
  });

  it('should allow supported language "es"', () => {
    expect(pipe.transform('es')).toBe('es');
  });

  it('should throw an error for unsupported language "jp"', () => {
    expect(() => pipe.transform('jp')).toThrow(BadRequestException);
    expect(() => pipe.transform('jp')).toThrow('jp not a supported language.');
  });

  it('should throw an error for empty string', () => {
    expect(() => pipe.transform('')).toThrow(BadRequestException);
    expect(() => pipe.transform('')).toThrow(' not a supported language.');
  });

  it('should throw an error for random invalid input', () => {
    expect(() => pipe.transform('abc')).toThrow(BadRequestException);
    expect(() => pipe.transform('abc')).toThrow('abc not a supported language.');
  });
});

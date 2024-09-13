import { DateValidationPipe } from './date-validation.pipe';
import { BadRequestException } from '@nestjs/common';

describe('DateValidationPipe', () => {
  let pipe: DateValidationPipe;

  beforeEach(() => {
    pipe = new DateValidationPipe();
  });

  it('should allow valid date in YYYY/MM/DD format', () => {
    expect(pipe.transform('2024/09/10')).toBe('2024/09/10');
  });

  it('should throw an error for date in wrong format YYYY-MM-DD', () => {
    expect(() => pipe.transform('2024-09-10')).toThrow(BadRequestException);
    expect(() => pipe.transform('2024-09-10')).toThrow('2024-09-10 is not a valid date format. Use YYYY/MM/DD.');
  });

  it('should throw an error for non-existent date like 2024/13/32', () => {
    expect(() => pipe.transform('2024/13/32')).toThrow(BadRequestException);
    expect(() => pipe.transform('2024/13/32')).toThrow('2024/13/32 is not a valid date.');
  });

  it('should throw an error for random invalid input', () => {
    expect(() => pipe.transform('random string')).toThrow(BadRequestException);
    expect(() => pipe.transform('random string')).toThrow('random string is not a valid date format. Use YYYY/MM/DD.');
  });

  it('should throw an error for incomplete date', () => {
    expect(() => pipe.transform('2024/09')).toThrow(BadRequestException);
    expect(() => pipe.transform('2024/09')).toThrow('2024/09 is not a valid date format. Use YYYY/MM/DD.');
  });
});

import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class DateValidationPipe implements PipeTransform {
  transform(value: string) {
    const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/; // Regex for YYYY/MM/DD format

    if (!dateRegex.test(value)) {
      throw new BadRequestException(`${value} is not a valid date format. Use YYYY/MM/DD.`);
    }

    // Additional check to ensure valid date (e.g., not 2024/13/32)
    const [year, month, day] = value.split('/').map(Number);
    const date = new Date(`${year}-${month}-${day}`);

    const isValidDate = !isNaN(date.getTime()) && 
                        date.getUTCFullYear() === year &&
                        date.getUTCMonth() + 1 === month &&
                        date.getUTCDate() === day;

    if (!isValidDate) {
      throw new BadRequestException(`${value} is not a valid date.`);
    }

    return value;
  }
}
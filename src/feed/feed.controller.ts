import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
  UsePipes,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { LanguageValidationPipe } from './language-validation.pipe'; // Import the validation pipe
import { DateValidationPipe } from './date-validation.pipe';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  async getFeed(
    @Query('date', DateValidationPipe) date: string, // Apply DateValidationPipe for YYYY/MM/DD format
    @Query('language') language: string,
  ) {
    try {
      return await this.feedService.getFeaturedContent(date, language);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_GATEWAY);
    }
  }

  // Proxy Wikipedia API and translate content
  @Get('translate/:language')
  async translateFeed(
    @Query('date', DateValidationPipe) date: string, // Apply the DateValidationPipe here as well
    @Param('language', LanguageValidationPipe) language: string // Apply it only to the language param
  ) {
    try {
      const data = await this.feedService.getFeaturedContent(date);

      // Translate the title and the extract using the translation service
      const translatedData = {
        title: await this.feedService.translateText(data.tfa.title, language),
        extract: await this.feedService.translateText(data.tfa.extract, language),
      };

      return translatedData;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_GATEWAY);
    }
  }
}

import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  async getFeed(
    @Query('date') date: string,
    @Query('language') language: string,
  ) {
    console.log('entre');

    return this.feedService.getFeaturedContent(date, language);
  }

  //  Wikipedia API and translate content
  @Get('translate/:language')
  async translateFeed(
    @Query('date') date: string,
    @Param('language') language: string,
  ) {
    const data = await this.feedService.getFeaturedContent(date);

    // Translate the title and extract
    const translatedData = {
      title: await this.feedService.translateText(data.tfa.title, language),
      extract: await this.feedService.translateText(data.tfa.extract, language),
    };

    return translatedData;
  }
}

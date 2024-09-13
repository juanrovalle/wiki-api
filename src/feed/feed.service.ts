import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class FeedService {
  private readonly WIKIPEDIA_API_URL = process.env.WIKIPEDIA_API_URL;
  private readonly LIBRETRANSLATE_API_URL = process.env.LIBRETRANSLATE_API_URL;

  // Fetch Wikipedia featured content
  async getFeaturedContent(date: string, language: string = 'en') {
    try {
      console.log(`${this.WIKIPEDIA_API_URL}/featured/${date}`);
      const response = await axios.get(
        `${this.WIKIPEDIA_API_URL}/${language}/featured/${date}`,
        {},
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Error fetching data from Wikipedia API',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
  // Translate content using LibreTranslate
  async translateText(text: string, targetLanguage: string) {
    try {
      const response = await axios.post(this.LIBRETRANSLATE_API_URL, {
        q: text,
        source: 'en',
        target: targetLanguage,
        format: 'text',
      });
      return response.data.translatedText;
    } catch (error) {
      throw new HttpException('Error translating text', HttpStatus.BAD_GATEWAY);
    }
  }
}

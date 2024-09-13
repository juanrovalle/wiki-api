import { Test, TestingModule } from '@nestjs/testing';
import { FeedService } from './feed.service';
import { HttpException } from '@nestjs/common';
import axios from 'axios';

jest.mock('axios');

describe('FeedService', () => {
  let service: FeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedService],
    }).compile();

    service = module.get<FeedService>(FeedService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getFeaturedContent', () => {
    it('should return featured content from Wikipedia API', async () => {
      const mockResponse = { data: { tfa: { title: 'Test Article' } } };
      (axios.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await service.getFeaturedContent('2024/09/10', 'en');
      expect(result).toEqual(mockResponse.data);
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.WIKIPEDIA_API_URL}en/featured/2024/09/10`,
        {},
      );
    });

    it('should throw HttpException when Wikipedia API fails', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error('API Error'));

      await expect(service.getFeaturedContent('2024/09/10', 'en')).rejects.toThrow(HttpException);
      await expect(service.getFeaturedContent('2024/09/10', 'en')).rejects.toThrow(
        'Error fetching data from Wikipedia API',
      );
    });
  });

  describe('translateText', () => {
    it('should return translated text from LibreTranslate API', async () => {
      const mockResponse = { data: { translatedText: 'Texto traducido' } };
      (axios.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await service.translateText('Hello world', 'es');
      expect(result).toEqual('Texto traducido');
      expect(axios.post).toHaveBeenCalledWith(process.env.LIBRETRANSLATE_API_URL, {
        q: 'Hello world',
        source: 'en',
        target: 'es',
        format: 'text',
      });
    });

    it('should throw HttpException when LibreTranslate API fails', async () => {
      (axios.post as jest.Mock).mockRejectedValue(new Error('Translation Error'));

      await expect(service.translateText('Hello world', 'es')).rejects.toThrow(HttpException);
      await expect(service.translateText('Hello world', 'es')).rejects.toThrow(
        'Error translating text',
      );
    });
  });
});

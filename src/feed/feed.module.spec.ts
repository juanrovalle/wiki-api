import { Test, TestingModule } from '@nestjs/testing';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { FeedModule } from './feed.module';
import axios from 'axios';
import { HttpException } from '@nestjs/common';

jest.mock('axios');

describe('FeedModule', () => {
  let controller: FeedController;
  let service: FeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FeedModule],
    }).compile();

    controller = module.get<FeedController>(FeedController);
    service = module.get<FeedService>(FeedService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getFeed (Integration Test)', () => {
    it('should return featured content from Wikipedia API', async () => {
      const mockResponse = { data: { tfa: { title: 'Test Article' } } };
      (axios.get as jest.Mock).mockResolvedValue(mockResponse);

      const result = await controller.getFeed('2024/09/10', 'en');
      expect(result).toEqual(mockResponse.data);
      expect(axios.get).toHaveBeenCalledWith(
        `${process.env.WIKIPEDIA_API_URL}en/featured/2024/09/10`,
        {},
      );
    });

    it('should throw HttpException when Wikipedia API fails', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error('API Error'));

      await expect(controller.getFeed('2024/09/10', 'en')).rejects.toThrow(HttpException);
      await expect(controller.getFeed('2024/09/10', 'en')).rejects.toThrow(
        'Error fetching data from Wikipedia API',
      );
    });
  });

  describe('translateFeed (Integration Test)', () => {
    it('should return translated content using LibreTranslate API', async () => {
      const mockFeaturedContent = { tfa: { title: 'Hello', extract: 'World' } };
      const mockTranslationResponse = { data: { translatedText: 'Hola' } };
      (axios.get as jest.Mock).mockResolvedValue({ data: mockFeaturedContent });
      (axios.post as jest.Mock).mockResolvedValue(mockTranslationResponse);

      const result = await controller.translateFeed('2024/09/10', 'es');
      expect(result).toEqual({
        title: 'Hola',
        extract: 'Hola',
      });
      expect(axios.post).toHaveBeenCalledTimes(2);
    });

    it('should throw HttpException when translation fails', async () => {
      const mockFeaturedContent = { tfa: { title: 'Hello', extract: 'World' } };
      (axios.get as jest.Mock).mockResolvedValue({ data: mockFeaturedContent });
      (axios.post as jest.Mock).mockRejectedValue(new Error('Translation Error'));

      await expect(controller.translateFeed('2024/09/10', 'es')).rejects.toThrow(HttpException);
      await expect(controller.translateFeed('2024/09/10', 'es')).rejects.toThrow(
        'Error translating text',
      );
    });
  });
});

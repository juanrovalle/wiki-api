import { Test, TestingModule } from '@nestjs/testing';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('FeedController', () => {
  let controller: FeedController;
  let service: FeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedController],
      providers: [
        {
          provide: FeedService,
          useValue: {
            getFeaturedContent: jest.fn(), // Mocking the service methods
            translateText: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FeedController>(FeedController);
    service = module.get<FeedService>(FeedService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getFeed', () => {
    it('should call getFeaturedContent and return data', async () => {
      // Mock the getFeaturedContent response
      const mockFeedData = { tfa: { title: 'Test Title', extract: 'Test Extract' } };
      (service.getFeaturedContent as jest.Mock).mockResolvedValue(mockFeedData);

      // Call the controller method
      const result = await controller.getFeed('2024-09-10', 'en');

      // Assertions
      expect(service.getFeaturedContent).toHaveBeenCalledWith('2024-09-10', 'en');
      expect(result).toEqual(mockFeedData);
    });

    it('should throw an HttpException if getFeaturedContent fails', async () => {
      // Mock the getFeaturedContent to throw an error
      (service.getFeaturedContent as jest.Mock).mockRejectedValue(new Error('API Error'));

      try {
        await controller.getFeed('2024-09-10', 'en');
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException); // Expecting HttpException
        expect(e.message).toBe('API Error');
        expect(e.getStatus()).toBe(HttpStatus.BAD_GATEWAY);
      }
    });
  });

  describe('translateFeed', () => {
    it('should call getFeaturedContent and translateText', async () => {
      // Mock the getFeaturedContent and translateText responses
      const mockFeedData = { tfa: { title: 'Test Title', extract: 'Test Extract' } };
      (service.getFeaturedContent as jest.Mock).mockResolvedValue(mockFeedData);
      (service.translateText as jest.Mock).mockResolvedValueOnce('Translated Title');
      (service.translateText as jest.Mock).mockResolvedValueOnce('Translated Extract');

      // Call the controller method
      const result = await controller.translateFeed('2024-09-10', 'es');

      // Assertions
      expect(service.getFeaturedContent).toHaveBeenCalledWith('2024-09-10');
      expect(service.translateText).toHaveBeenCalledWith('Test Title', 'es');
      expect(service.translateText).toHaveBeenCalledWith('Test Extract', 'es');
      expect(result).toEqual({
        title: 'Translated Title',
        extract: 'Translated Extract',
      });
    });

    it('should throw an HttpException if translateText fails', async () => {
      // Mock the getFeaturedContent response
      const mockFeedData = { tfa: { title: 'Test Title', extract: 'Test Extract' } };
      (service.getFeaturedContent as jest.Mock).mockResolvedValue(mockFeedData);

      // Mock translateText to throw an HttpException
      (service.translateText as jest.Mock).mockRejectedValue(
        new HttpException('Translation Error', HttpStatus.BAD_GATEWAY),
      );

      try {
        await controller.translateFeed('2024-09-10', 'es');
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.message).toBe('Translation Error');
        expect(e.getStatus()).toBe(HttpStatus.BAD_GATEWAY);
      }
    });
  });
});

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { bootstrap } from './main'; // Assuming the bootstrap function is exported

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn().mockResolvedValue({
      listen: jest.fn().mockResolvedValue(true),
    }),
  },
}));

describe('Main Bootstrap', () => {
  it('should call NestFactory.create and start the app', async () => {
    await bootstrap();
    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
    const app = await NestFactory.create(AppModule);
    expect(app.listen).toHaveBeenCalledWith(3000);
  });
});

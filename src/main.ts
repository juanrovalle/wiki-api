import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FeedModule } from './feed/feed.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

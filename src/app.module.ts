import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedModule } from './feed/feed.module';
import { FeedController } from './feed/feed.controller';
import { FeedService } from './feed/feed.service';

@Module({
  imports: [FeedModule],
})
export class AppModule {}

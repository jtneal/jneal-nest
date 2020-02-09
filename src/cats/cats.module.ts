import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MeowMiddleware } from './middleware/meow.middleware';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MeowMiddleware)
      .forRoutes(CatsController);
  }
}

import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppModule } from './app.module';

describe('AppModule', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    controller = await module.resolve<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

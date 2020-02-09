import { MiddlewareConsumer, NestMiddleware } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { CatsController } from './cats.controller';
import { CatsModule } from './cats.module';
import { MeowMiddleware } from './middleware/meow.middleware';

let testMiddleware: NestMiddleware;
let testController: CatsController;

const consumerMock = {
  apply: (middleware: any) => {
    testMiddleware = middleware;

    return {
      forRoutes: (controller: any) => {
        testController = controller;
      },
    }
  },
} as MiddlewareConsumer;

describe('AppModule', () => {
  let controller: CatsController;
  let catsModule: CatsModule;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CatsModule],
    }).compile();

    controller = await module.resolve<CatsController>(CatsController);
    catsModule = await module.resolve<CatsModule>(CatsModule);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should attach middlware', () => {
    catsModule.configure(consumerMock);
    expect(testMiddleware).toBe(MeowMiddleware);
    expect(testController).toBe(CatsController);
  });
});

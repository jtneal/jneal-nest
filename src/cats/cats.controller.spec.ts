import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { of } from 'rxjs';

import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { catMock } from './mocks/cat.mock';
import { catsMock } from './mocks/cats.mock';
import { CreateCatDto } from './dto/create-cat.dto';

describe('Cats Controller', () => {
  let controller: CatsController;
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    controller = await module.resolve<CatsController>(CatsController);
    service = await module.resolve<CatsService>(CatsService);
  });

  afterEach(() => jest.restoreAllMocks());

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all cats', async () => {
      jest.spyOn(service, 'findAll').mockImplementation(() => of(catsMock));
      const response = await controller.findAll({ method: 'GET', url: '/cats' } as Request).toPromise();
      expect(response.cats).toBe(catsMock);
    });
  });

  describe('create', () => {
    it('should create cat', async () => {
      const dto = new CreateCatDto();
      dto.age = catMock.age;
      dto.breed = catMock.breed;
      dto.name = catMock.name;
      const spy = jest.spyOn(console, 'log').mockImplementation(() => null);
      jest.spyOn(service, 'create').mockImplementation(() => of(catMock));
      const response = await controller.create({ method: 'POST', url: '/cats' } as Request, dto).toPromise();
      expect(response.cat).toBe(catMock);
      expect(spy).toHaveBeenCalledWith('Whiskers (5 year old American Shorthair)')
    });
  });

  describe('findOne', () => {
    it('should return a cat', async () => {
      jest.spyOn(service, 'findOne').mockImplementation(() => of(catMock));
      const response = await controller.findOne({ method: 'GET', url: '/cats/1' } as Request, 1).toPromise();
      expect(response.cat).toBe(catMock);
    });
  });

  describe('delete', () => {
    it('should delete a cat', () => {
      jest.spyOn(service, 'delete').mockImplementation(() => undefined);
      const response = controller.delete(1);

      expect(response).toBe(undefined);
    });
  });
});

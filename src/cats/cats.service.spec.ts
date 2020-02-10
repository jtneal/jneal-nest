import { HttpModule, HttpService, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';

import { CatsService } from './cats.service';
import { catMock } from './mocks/cat.mock';
import { catsMock } from './mocks/cats.mock';

describe('CatsService', () => {
  let service: CatsService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [CatsService],
    }).compile();

    service = module.get<CatsService>(CatsService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all cats', async () => {
      const cats = await service.findAll().toPromise();
      expect(cats).toBe(catsMock);
    });
  });

  describe('create', () => {
    it('should create cat', async () => {
      const cat = await service.create(catMock).toPromise();
      expect(cat).toBe(catMock);
    });
  });

  describe('findOne', () => {
    it('should return a cat', async () => {
      const cat = await service.findOne(1).toPromise();
      expect(cat).toBe(catsMock[0]);
    });

    it('should throw NotFoundException', () => {
      const testException = () => {
        service.findOne(0).subscribe();
      };
      expect(testException).toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should return a cat', async () => {
      const response = service.delete(1);
      expect(response).toBe(undefined);
    });

    it('should throw NotFoundException', () => {
      const testException = () => {
        service.delete(0);
      };
      expect(testException).toThrow(NotFoundException);
    });
  });

  describe('getUser', () => {
    it('should get user', async () => {
      const mock = { data: { login: 'test' } } as AxiosResponse;
      jest.spyOn(httpService, 'get').mockImplementation(() => of(mock));
      const user = await service.getUser().toPromise();
      expect(user).toBe(mock.data);
    });
  });
});

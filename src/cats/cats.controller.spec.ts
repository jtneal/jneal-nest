import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';

import { CatsController } from './cats.controller';

describe('Cats Controller', () => {
  const cats = ["Persian", "Maine Coon", "Exotic", "Siamese", "Abyssinian", "Ragdoll", "Birman", "American Shorthair", "Oriental", "Sphynx"];
  let controller: CatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
    }).compile();

    controller = await module.resolve<CatsController>(CatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all cats', () => {
      controller.findAll({ method: 'GET', url: '/cats' } as Request).subscribe((response) => {
        expect(response.cats).toEqual(cats);
      });
    });
  });

  describe('create', () => {
    it('should create cat', () => {
      controller.create({ method: 'POST', url: '/cats' } as Request, 'New Cat').subscribe((response) => {
        expect(response.cats).toEqual([ ...cats, 'New Cat' ]);
      });
    });

    it('should throw BadRequestException', () => {
      const testException = () => {
        controller.create({ method: 'POST', url: '/cats' } as Request, '').subscribe();
      }

      expect(testException).toThrow(BadRequestException);
    });
  });

  describe('findOne', () => {
    it('should return a cat', () => {
      const response = controller.findOne({ method: 'GET', url: '/cats/1' } as Request, '1');

      expect(response.cat).toEqual(cats[0]);
    });
  });

  describe('delete', () => {
    it('should delete a cat', () => {
      const response = controller.delete('1');

      expect(response).toBe(undefined);
    });
  });
});

import { CreateCatDto } from './create-cat.dto';

describe('CreateCat', () => {
  let dto: CreateCatDto;

  beforeEach(() => dto = new CreateCatDto());

  it('should be defined', () => {
    expect(dto).toBeDefined();
  });

  describe('toString', () => {
    it('should return string with only name', () => {
      dto.name = 'Test';
      expect(dto.toString()).toBe('Test');
    });

    it('should return string with name and age', () => {
      dto.name = 'Test';
      dto.age = 1;
      expect(dto.toString()).toBe('Test (1 year old)');
    });

    it('should return string with name and breed', () => {
      dto.name = 'Test';
      dto.breed = 'Tabby';
      expect(dto.toString()).toBe('Test (Tabby)');
    });

    it('should return string with name, age, and breed', () => {
      dto.name = 'Test';
      dto.age = 1;
      dto.breed = 'Tabby';
      expect(dto.toString()).toBe('Test (1 year old Tabby)');
    });
  });
});

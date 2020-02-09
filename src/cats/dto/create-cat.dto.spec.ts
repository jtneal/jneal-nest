import { CreateCatDto } from './create-cat.dto';

describe('CreateCat', () => {
  it('should be defined', () => {
    expect(new CreateCatDto()).toBeDefined();
  });
});

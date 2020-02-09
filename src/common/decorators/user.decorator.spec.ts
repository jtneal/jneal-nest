import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';

import { User as UserEntity } from '../interfaces/user.interface';
import { User } from './user.decorator';

const userMock: UserEntity = {
  firstName: 'Jason',
  lastName: 'Neal',
};

function getParamDecoratorFactory(decorator: Function) {
  class Test {
    public test(@decorator() value) {} // eslint-disable-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  }

  const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test');
  return args[Object.keys(args)[0]].factory;
}

describe('User Decorator', () => {
  afterEach(() => jest.restoreAllMocks());

  it('should be defined', () => {
    expect(User).toBeDefined();
  });

  it('should return user', () => {
    const factory = getParamDecoratorFactory(User);
    expect(factory(null, { user: userMock })).toBe(userMock);
  });

  it('should return firstName', () => {
    const factory = getParamDecoratorFactory(User);
    expect(factory('firstName', { user: userMock })).toBe(userMock.firstName);
  });
});

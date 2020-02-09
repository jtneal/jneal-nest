import { ExecutionContext } from '@nestjs/common';

import { AuthGuard } from './auth.guard';

const mockRequest = { user: { firstName: '', lastName: '' } };

const mockContext = {
  switchToHttp: () => ({
    getRequest: () => mockRequest
  })
} as ExecutionContext;

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => guard = new AuthGuard());

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should add user to request', () => {
    expect(guard.canActivate(mockContext)).toBeTruthy();
    expect(mockRequest.user).toEqual({ firstName: 'Jason', lastName: 'Neal' });
  });
});

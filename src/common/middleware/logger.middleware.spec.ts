import { Request, Response } from 'express';

import { logger } from './logger.middleware';

describe('LoggerMiddleware', () => {
  afterEach(() => jest.restoreAllMocks());

  it('should be defined', () => {
    expect(logger).toBeDefined();
  });

  it('should log incoming requests', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    logger({ method: 'POST', url: '/cats' } as Request, {} as Response, () => {});
    expect(spy).toHaveBeenCalledWith('Incoming Request: POST /cats');
  });
});

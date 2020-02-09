import { MeowMiddleware } from './meow.middleware';

describe('MeowMiddleware', () => {
  let middleware: MeowMiddleware;

  beforeEach(() => {
    middleware = new MeowMiddleware();
  });

  afterEach(() => jest.restoreAllMocks());

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('should log meow', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    middleware.use({ method: 'GET', url: '/cats' } as Request, {} as Response, () => {});
    expect(spy).toHaveBeenCalledWith('Meow!');
  });
});

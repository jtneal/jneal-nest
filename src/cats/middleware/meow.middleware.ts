import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class MeowMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('Meow!');
    next();
  }
}

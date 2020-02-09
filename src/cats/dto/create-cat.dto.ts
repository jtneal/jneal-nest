import { Cat } from '../interfaces/cat.interface';

export class CreateCatDto implements Cat {
  readonly age?: number;
  readonly breed?: string;
  readonly name: string;
}

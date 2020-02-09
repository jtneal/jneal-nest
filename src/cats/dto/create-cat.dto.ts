import { IsInt, IsOptional, IsString } from 'class-validator';

import { Cat } from '../interfaces/cat.interface';

export class CreateCatDto implements Cat {
  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsString()
  breed?: string;

  @IsString()
  name: string;

  toString() {
    let value = this.name;

    if (this.age || this.breed) {
      value += ' (';

      if (this.age) {
        value += `${this.age} year old`
      }

      if (this.breed) {
        if (this.age) {
          value += ' ';
        }

        value += this.breed;
      }

      value += ')';
    }

    return value;
  }
}

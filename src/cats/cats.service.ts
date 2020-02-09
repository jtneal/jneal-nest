import { Injectable, NotFoundException } from '@nestjs/common';
import { Observable, of } from 'rxjs';

import { Cat } from './interfaces/cat.interface';
import { catsMock } from './mocks/cats.mock';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = catsMock;

  findAll(): Observable<Cat[]> {
    return of(this.cats);
  }

  create(cat: Cat): Observable<Cat> {
    this.cats.push(cat);
    return of(cat);
  }

  findOne(id: number): Observable<Cat> {
    return of(this.cats[this.getKey(id)]);
  }

  delete(id: number) {
    this.cats.splice(this.getKey(id), 1);
  }

  private getKey(id: number): number {
    const key = id - 1;

    if (!(key in this.cats)) {
      throw new NotFoundException('Cat not found')
    }

    return key;
  }
}

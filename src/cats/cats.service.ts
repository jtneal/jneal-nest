import { HttpService, Injectable, NotFoundException } from '@nestjs/common';
import { Observable, of } from 'rxjs';

import { Cat } from './interfaces/cat.interface';
import { GitUserEntity } from './interfaces/git-user.interface';
import { catsMock } from './mocks/cats.mock';
import { map } from 'rxjs/operators';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = catsMock;

  constructor(private readonly httpService: HttpService) {}

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

  getUser(): Observable<GitUserEntity> {
    return this.httpService.get<GitUserEntity>('https://api.github.com/users/jtneal').pipe(
      map((response) => response.data),
    );
  }

  private getKey(id: number): number {
    const key = id - 1;

    if (!(key in this.cats)) {
      throw new NotFoundException('Cat not found')
    }

    return key;
  }
}

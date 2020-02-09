import { Body, Controller, Delete, Get, Header, HttpCode, Param, Post, Req, Scope, ValidationPipe, UsePipes, ParseIntPipe } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

@Controller({
  path: 'cats',
  scope: Scope.REQUEST,
})
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  findAll(@Req() request: Request): Observable<CatsResponse> {
    return this.catsService.findAll().pipe(
      map(this.getCatsResponse(request)),
    );
  }

  @Post()
  @Header('Cache-Control', 'none')
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Req() request: Request, @Body() createCatDto: CreateCatDto): Observable<CatResponse> {
    console.log(createCatDto.toString());

    return this.catsService.create(createCatDto).pipe(
      map(this.getCatResponse(request))
    );
  }

  @Get(':id')
  findOne(@Req() request: Request, @Param('id', new ParseIntPipe()) id: number): Observable<CatResponse> {
    return this.catsService.findOne(id).pipe(
      map(this.getCatResponse(request)),
    );
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseIntPipe()) id: number) {
    this.catsService.delete(id);
  }

  private getCatsResponse(request: Request): (cats: Cat[]) => CatsResponse {
    return (cats: Cat[]) => ({ cats, _links: this.getHateosLinks(request) });
  }

  private getCatResponse(request: Request): (cat: Cat) => CatResponse {
    return (cat: Cat) => ({ cat, _links: this.getHateosLinks(request) });
  }

  private getHateosLinks(request: Request): HateosLinks {
    return {
      self: {
        href: request.url,
        method: request.method
      }
    };
  }
}

interface CatResponse {
  cat: Cat;
  _links: HateosLinks;
}

interface CatsResponse {
  cats: Cat[];
  _links: HateosLinks;
}

interface HateosLinks {
  self: HateosLink;
}

interface HateosLink {
  href: string;
  method: string
}

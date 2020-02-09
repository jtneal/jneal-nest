import { BadRequestException, Body, Controller, Delete, Get, Header, HttpCode, Post, Req, Param, Scope } from '@nestjs/common';
import { Request } from 'express';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller({
  path: 'cats',
  scope: Scope.REQUEST,
})
export class CatsController {
  cats = [
    "Persian",
    "Maine Coon",
    "Exotic",
    "Siamese",
    "Abyssinian",
    "Ragdoll",
    "Birman",
    "American Shorthair",
    "Oriental",
    "Sphynx",
  ];

  @Get()
  findAll(@Req() request: Request): Observable<CatsResponse> {
    return of<CatsResponse>({
      cats: this.cats,
      _links: this.getHateosLinks(request),
    });
  }

  @Post()
  @Header('Cache-Control', 'none')
  create(@Req() request: Request, @Body('name') name: string): Observable<CatsResponse> {
    if (!name) {
      throw new BadRequestException('Name is required');
    }

    const response = this.findAll(request).pipe(
      map((response) => {
        response.cats.push(name);

        return response;
      })
    );

    response.pipe();

    return response;
  }

  @Get(':id')
  findOne(@Req() request: Request, @Param('id') id: string): CatResponse {
    return {
      cat: this.cats[parseInt(id) - 1],
      _links: this.getHateosLinks(request),
    }
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    console.log(`Delete ${this.cats[parseInt(id) - 1]}`);
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
  cat: string;
  _links: HateosLinks;
}

interface CatsResponse {
  cats: string[];
  _links: HateosLinks;
}

interface HateosLinks {
  self: HateosLink;
}

interface HateosLink {
  href: string;
  method: string
}

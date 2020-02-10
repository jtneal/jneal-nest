import { Expose } from 'class-transformer';

export class GitUserEntity {
  @Expose() login: string;
  @Expose() id: number;
  @Expose() name: string;
  @Expose() url: string;

  constructor(partial: Partial<GitUserEntity>) {
    Object.assign(this, partial);
  }
}

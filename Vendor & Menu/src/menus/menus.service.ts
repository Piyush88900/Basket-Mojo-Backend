import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './menu.entity';

@Injectable()
export class MenusService {
  constructor(@InjectRepository(MenuItem) private repo: Repository<MenuItem>) {}

  getMenu() {
    return this.repo.find();
  }
}

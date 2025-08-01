import { Controller, Get } from '@nestjs/common';
import { MenusService } from './menus.service';

@Controller('menu')
export class MenusController {
  constructor(private menusService: MenusService) {}

  @Get()
  getMenu() {
    return this.menusService.getMenu();
  }
}

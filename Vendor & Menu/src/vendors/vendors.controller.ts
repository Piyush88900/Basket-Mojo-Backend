import { Controller, Get } from '@nestjs/common';
import { VendorsService } from './vendors.service';

@Controller('vendor')
export class VendorsController {
  constructor(private vendorsService: VendorsService) {}

  @Get()
  getVendor() {
    return this.vendorsService.getVendor();
  }
}

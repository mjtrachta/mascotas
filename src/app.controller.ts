import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}
/*
  @Get('/numbertowords/:numero')
  async priceDelivery(@Param('numero') numero: number): Promise<any>{
    return this.appService.callService(numero);
  }
  */

  @Get('/numbertowords/:numero')
  async getNumberToWords(@Param('numero') numero: number): Promise<string> {
    return this.appService.callService(numero);
  }
}

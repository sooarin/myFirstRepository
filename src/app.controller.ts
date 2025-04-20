import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api') // -> /api/~~
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/gethello') // -> /api/gethello
  getHello(): string {
    return this.appService.getHello();
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async generateNotification(@Body() payload: any): Promise<any> {
    return await this.appService.generateNotification(payload);
  }
}

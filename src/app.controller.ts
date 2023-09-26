import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
@Controller()
@ApiTags('health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Health check of WSO2 transactional api',
  })
  @ApiResponse({
    status: 200,
    description: 'Get welcome message.',
    type: String,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request or wallet address not found.',
  })
  @ApiResponse({ status: 500, description: 'Server Error.' })
  getHealth(): string {
    return this.appService.getHealth();
  }
}

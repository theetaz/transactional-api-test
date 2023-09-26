import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): string {
    return 'WSO2 transactional api is healthy!';
  }
}

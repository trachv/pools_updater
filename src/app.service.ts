import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkAlive(): string {
    return 'I am alive!';
  }
}

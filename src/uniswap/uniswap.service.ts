import { Injectable } from '@nestjs/common';

@Injectable()
export class UniswapService {
  async updatePoolsInfo() {
    console.log('hello from updatePoolsInfo');

    return new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

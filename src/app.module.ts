import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { UniswapModule } from './uniswap/uniswap.module';

/**
 * main module
 */
@Module({
  imports: [ScheduleModule.forRoot(), UniswapModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

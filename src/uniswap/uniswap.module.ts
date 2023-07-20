import { Module } from '@nestjs/common';
import { UniswapCron } from './uniswap.cron.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UniswapService } from './uniswap.service';

/**
 * Uniswap module
 * You can add controller to work with module outside
 */
@Module({
  imports: [PrismaModule],
  providers: [UniswapCron, UniswapService],
})
export class UniswapModule {}

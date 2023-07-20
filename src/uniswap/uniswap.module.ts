import { Module } from '@nestjs/common';
import { UniswapCron } from 'src/cron/uniswap.cron.service';
import { PrismaModule } from 'src/prisma/prisma.module';

/**
 * Uniswap module
 * You can add controller to work with module outside
 */
@Module({
  imports: [PrismaModule],
  providers: [UniswapCron],
})
export class UniswapModule {}

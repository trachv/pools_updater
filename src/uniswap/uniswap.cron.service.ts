import { PrismaService } from '../prisma/prisma.service';
import { CronService } from '../cron/cron.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';
import { UniswapService } from './uniswap.service';

@Injectable()
export class UniswapCron extends CronService {
  constructor(
    protected readonly prisma: PrismaService,
    private readonly uniswapService: UniswapService,
  ) {
    super(prisma);
  }

  private readonly taskName = 'update_pools_info_uniswap';
  private readonly appName = 'pools_updater';

  async onModuleInit() {
    await this.updatePoolsInfo();
  }

  @Cron(CronExpression.EVERY_30_MINUTES, { name: 'update_pools_info_uniswap' })
  async updatePoolsInfo() {
    if (await this.isJobRunning(this.appName, this.taskName)) {
      console.log(
        `Cron job ${this.taskName} is already running. Skipping this run.`,
      );
      return;
    }

    await this.startJob(this.appName, this.taskName);

    console.log(`Start job ${this.taskName} at ${new Date().toUTCString()}`);
    try {
      await this.uniswapService.updatePoolsInfo();
      console.log(`Job ${this.taskName} completed successfully.`);
    } catch (error) {
      console.log(`Error execution Job ${this.taskName} error: ${error}`);
    }

    await this.completeJob(this.appName, this.taskName);
    console.log(`Job ${this.taskName} complete`);
  }
}

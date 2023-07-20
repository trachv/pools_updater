import { PrismaService } from '../prisma/prisma.service';
import { CronService } from '../cron/cron.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';
import { UniswapService } from './uniswap.service';

@Injectable()
export class UniswapCron extends CronService {
  private readonly TASK_NAME = 'update_pools_info_uniswap';
  private readonly APP_NAME = 'pools_updater';

  constructor(
    protected readonly prisma: PrismaService,
    private readonly uniswapService: UniswapService,
  ) {
    super(prisma);
  }

  async onModuleInit() {
    await this.updatePoolsInfo();
  }

  /**
   * interval can be moved to env
   */
  @Cron(CronExpression.EVERY_30_MINUTES, { name: 'update_pools_info_uniswap' })
  async updatePoolsInfo() {
    if (await this.isJobRunning(this.APP_NAME, this.TASK_NAME)) {
      console.log(
        `Cron job ${this.TASK_NAME} is already running. Skipping this run.`,
      );
      return;
    }

    await this.startJob(this.APP_NAME, this.TASK_NAME);

    console.log(`Start job ${this.TASK_NAME} at ${new Date().toUTCString()}`);
    try {
      await this.uniswapService.updatePoolsInfo();
      console.log(`Job ${this.TASK_NAME} completed successfully.`);
    } catch (error) {
      console.log(`Error execution Job ${this.TASK_NAME} error: ${error}`);
    }

    await this.completeJob(this.APP_NAME, this.TASK_NAME);
    console.log(`Job ${this.TASK_NAME} complete`);
  }
}

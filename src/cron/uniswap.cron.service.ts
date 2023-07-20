import { PrismaService } from 'src/prisma/prisma.service';
import { CronService } from './cron.service';
import { Cron, CronExpression } from '@nestjs/schedule';

export class UniswapCron extends CronService {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  async onModuleInit() {
    await this.updaterPoolsInfo();
  }

  private readonly jobName = 'refreshRanking';
  private readonly appName = 'hubs-updater';

  @Cron(CronExpression.EVERY_30_MINUTES, { name: 'refreshRanking' })
  async updaterPoolsInfo() {
    return Promise.resolve('');
  }
}

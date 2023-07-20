import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export abstract class CronService {
  constructor(protected readonly prisma: PrismaService) {}

  protected async isJobRunning(
    appName: string,
    taskName: string,
  ): Promise<boolean> {
    const job = await this.prisma.scheduledTasks.findUnique({
      where: {
        appName_taskName: {
          appName,
          taskName,
        },
      },
    });
    return !!job;
  }

  protected async startJob(appName: string, taskName: string): Promise<void> {
    await this.prisma.scheduledTasks.create({
      data: {
        appName,
        taskName,
        timeStart: new Date(),
      },
    });
  }

  protected async completeJob(
    appName: string,
    taskName: string,
  ): Promise<void> {
    await this.prisma.scheduledTasks.delete({
      where: {
        appName_taskName: {
          appName,
          taskName,
        },
      },
    });
  }
}

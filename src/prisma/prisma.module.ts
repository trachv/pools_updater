import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * common module for work with database
 */
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

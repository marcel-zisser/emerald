import { Module } from '@nestjs/common';
import { ResultController } from './result.controller';
import { ResultService } from './result.service';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [ResultController],
  providers: [ResultService, PrismaService],
})
export class ResultModule {}

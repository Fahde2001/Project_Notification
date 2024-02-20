import { Module } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { ProblemsController } from './problems.controller';
import {PrismaService} from "../prisma/prisma.service";

@Module({
  controllers: [ProblemsController],
  providers: [ProblemsService,PrismaService],
})
export class ProblemsModule {}

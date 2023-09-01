import { Module } from '@nestjs/common';
import { CasService } from './cas.service';
import { CasController } from './cas.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [CasController],
  providers: [CasService]
})
export class CasModule {}

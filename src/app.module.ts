import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CasModule } from './cas/cas.module';

@Module({
  imports: [CasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

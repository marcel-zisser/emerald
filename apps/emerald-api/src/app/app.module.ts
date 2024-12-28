import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './authentication/auth.module';
import { AuthGuard } from './authentication/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { RolesGuard } from './authentication/roles.guard';
import { ChecklistModule } from './checklist/checklist.module';
import { ReviewModule } from './review/review.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ResultModule } from './result/result.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ChecklistModule,
    ReviewModule,
    DashboardModule,
    ResultModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}

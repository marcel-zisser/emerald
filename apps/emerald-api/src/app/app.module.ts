import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './authentication/auth.module';
import { AuthGuard } from './authentication/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { RolesGuard } from './authentication/roles.guard';

@Module({
  imports: [AuthModule, UserModule],
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

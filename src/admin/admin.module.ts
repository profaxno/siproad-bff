import { PfxHttpModule } from 'profaxnojs/axios';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AdminUserResolver } from './admin-user.resolver';
import { AdminUserService } from './admin-user.service';

@Module({
  imports: [ConfigModule, PfxHttpModule],
  providers: [AdminUserResolver, AdminUserService],
  exports: [AdminUserService]
})
export class AdminModule {}

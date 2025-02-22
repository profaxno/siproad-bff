import { PfxHttpModule } from 'profaxnojs/axios';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AdminCompanyResolver } from './admin-company.resolver';
import { AdminCompanyService } from './admin-company.service';
import { AdminUserResolver } from './admin-user.resolver';
import { AdminUserService } from './admin-user.service';

@Module({
  imports: [ConfigModule, PfxHttpModule],
  providers: [AdminCompanyResolver, AdminCompanyService, AdminUserResolver, AdminUserService],
  exports: [AdminUserService]
})
export class AdminModule {}

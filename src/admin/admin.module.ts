import { PfxHttpModule } from 'profaxnojs/axios';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AdminUserResolver } from './admin-user.resolver';
import { AdminUserService } from './admin-user.service';
import { AdminDocumentTypeResolver } from './admin-document-type.resolver';
import { AdminDocumentTypeService } from './admin-document-type.service';

@Module({
  imports: [ConfigModule, PfxHttpModule],
  providers: [AdminUserResolver, AdminUserService, AdminDocumentTypeResolver, AdminDocumentTypeService],
  exports: [AdminUserService]
})
export class AdminModule {}

import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { PfxHttpModule } from 'profaxnojs/axios/pfx-http.module';

import { PurchasesOrderResolver } from './purchases-order.resolver';
import { PurchasesOrderService } from './purchases-order.service';
import { PurchasesTypeResolver } from './purchases-type.resolver';
import { PurchasesTypeService } from './purchases-type.service';

@Module({
  imports: [ConfigModule, PfxHttpModule],
  providers: [PurchasesOrderResolver, PurchasesOrderService, PurchasesTypeResolver, PurchasesTypeService],
})
export class PurchasesModule {}

import { Module } from '@nestjs/common';
import { PurchasesOrderResolver } from './purchases-order.resolver';
import { PurchasesOrderService } from './purchases-order.service';
import { PfxHttpModule } from 'profaxnojs/axios/pfx-http.module';
import { ConfigModule } from '@nestjs/config';
import { PurchasesProductResolver } from './purchases-product.resolver';
import { PurchasesProductService } from './purchases-product.service';
import { PurchasesTypeResolver } from './purchases-type.resolver';
import { PurchasesTypeService } from './purchases-type.service';

@Module({
  imports: [ConfigModule, PfxHttpModule],
  providers: [PurchasesProductResolver, PurchasesProductService, PurchasesOrderResolver, PurchasesOrderService, PurchasesTypeResolver, PurchasesTypeService],
})
export class PurchasesModule {}
